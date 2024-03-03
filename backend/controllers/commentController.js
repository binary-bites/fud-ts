import User from '../models/userModel.js'
import Profile from '../models/profileModel.js'
import UserActivity from '../models/userActivityModel.js'
import Comment from '../models/commentModel.js'
import Post from '../models/postModel.js'
import checkInput from '../utils/utils.js'

export const createComment = async (req, res) => {
    try {
        const { content, user, postID } = req.body
        checkInput(['content', 'user', 'post'], req.body);
        const comment = new Comment({ content, user, postID })
        await comment.save()
        const userActivity = await UserActivity.findOne({ user })
        userActivity.comments.push(comment._id)
        await userActivity.save()
        res.status(200).json( comment )
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

export const deleteComment = async (req, res) => {
    try {
        const { commentID, user } = req.body;
        checkInput(['commentID', 'user'], req.body);
        const comment = await Comment.findOne({ _id: commentID });
        const userActivity = await UserActivity.findOne({ user });
        const post = await Post.findOne({ _id: comment.post });
        if (!comment || comment.deleted) {
            throw Error('Comment does not exist');
        }
        if (!comment.user.equals(new mongoose.Types.ObjectId(user))) {
            throw Error('User is not authorized to delete this comment');
        }
        if (!userActivity || userActivity.deleted) {
            throw Error('User activity does not exist');
        }
        if (!post || post.deleted) {
            throw Error('Post does not exist');
        }
        deleteCommentHelper(commentID, user) ? res.status(200).json({ message: 'Comment deleted' }) : res.status(401).json({ error: 'Error deleting comment' });
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}


export const deleteCommentHelper = async (commentID) => {
    try {
        const comment = await Comment.findOne({ _id: commentID });
        const post = await Post.findOne({ _id: comment.post });
        post.comments = post.comments.filter(comment => !comment.equals(new mongoose.Types.ObjectId(commentID)));
        await post.save();
        comment.deleted = true;
        await comment.save();
        await UserActivity.updateMany(
            {},
            {
                $pull: {
                    comments: commentID,
                }
            }
        );
        return true;
    } catch (error) {
        return false;
    }
}

export const likeComment = async (req, res) => {
    try {
        const { commentID, user } = req.body;
        checkInput(['commentID', 'user'], req.body);
        //implement likeComment if its liked then remove like if its not liked then add like
        const userActivity = await UserActivity.findOne({ user });
        const comment = await Comment.findOne({ _id: commentID });
        if (!comment || comment.deleted) {
            throw Error('Comment does not exist');
        }
        if (!userActivity || userActivity.deleted) {
            throw Error('User activity does not exist');
        }
        if (comment.likes.includes(new mongoose.Types.ObjectId(user))) {
            comment.likes = comment.likes.filter(like => !like.equals(new mongoose.Types.ObjectId(user)));
        } else {
            comment.likes.push(user);
        }
        await comment.save();
        res.status(200).json( comment );
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

export const dislikeComment = async (req, res) => {
    try {
        const { commentID, user } = req.body;
        checkInput(['commentID', 'user'], req.body);
        //implement dislikeComment if its disliked then remove dislike if its not disliked then add dislike
        const userActivity = await UserActivity.findOne({ user });
        const comment = await Comment.findOne({ _id: commentID });
        if (!comment || comment.deleted) {
            throw Error('Comment does not exist');
        }
        if (!userActivity || userActivity.deleted) {
            throw Error('User activity does not exist');
        }
        if (comment.dislikes.includes(new mongoose.Types.ObjectId(user))) {
            comment.dislikes = comment.dislikes.filter(dislike => !dislike.equals(new mongoose.Types.ObjectId(user)));
        } else {
            comment.dislikes.push(user);
        }
        await comment.save();
        res.status(200).json( comment );
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

