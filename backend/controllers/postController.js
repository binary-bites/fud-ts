import User from '../models/userModel.js'
import Profile from '../models/profileModel.js'
import UserActivity from '../models/userActivityModel.js'
import Comment from '../models/commentModel.js'
import Post from '../models/postModel.ts'
import  checkInput  from '../utils/utils.js'
import { deleteCommentHelper } from './commentController.js'
import { mongoose } from 'mongoose'

//MAKE CREATE POST AND EDIT POST TAKE IMAGES
export const createPost = async (req, res) => {
    try {
        console.log("IN create post")
        const { title, content, user, images } = req.body
        //checkInput(['title', 'content', 'user'], req.body);
        const profile = await Profile.findOne({ user })
        if (!profile || profile.deleted) {
            console.log('User does not exist')
            throw Error('User does not exist')
        }
        const post = new Post({ title, content, user })
        await post.save()
        const userActivity = await UserActivity.findOne({ user })
        userActivity.posts.push(post._id)
        await userActivity.save()
        res.status(200).json({ post })
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

export const deletePost = async (req, res) => {
    try {
        const { postID, user } = req.body;
        checkInput(['postID', 'user'], req.body);

        const post = await Post.findOne({ _id: postID });
        const userActivity = await UserActivity.findOne({ user });
        if (!post || post.deleted) {
            throw Error('Post does not exist');
        }
        if (!post.user.equals(new mongoose.Types.ObjectId(user))) {
            throw Error('User is not authorized to delete this post');
        } 
        if (!userActivity || userActivity.deleted) {
            throw Error('User activity does not exist');
        }

        post.deleted = true;
        userActivity.posts = userActivity.posts.filter(post => !post.equals(new mongoose.Types.ObjectId(postID)));

        // Update userActivity for the post owner
        await userActivity.save();

        // Find all UserActivities that have liked or disliked this post and remove the like or dislike
        await UserActivity.updateMany(
            {},
            {
                $pull: {
                    likes: postID,
                    dislikes: postID
                }
            }
        );

        await Profile.updateMany(
            {},
            {
                $pull: {
                    savedPosts: postID,
                }
            }
        );

        for (const commentID of post.comments) {
            await deleteCommentHelper(commentID);
        }

        await post.save();

        res.status(200).json({ post });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};


export const likePost = async (req, res) => {
    try {
        const { postID, user } = req.body
        checkInput(['postID', 'user'], req.body);
        
        const post = await Post.findOne({ _id: postID })
        if (!post || post.deleted) {
            throw Error('Post does not exist')
        }
        const userActivity = await UserActivity.findOne({ user })
        if (!userActivity || userActivity.deleted) {
            throw Error('User activity does not exist')
        }
        //if they have already liked remove their like and if they haven't liked it add their like
        if (post.likes.includes(new mongoose.Types.ObjectId(user))) {
            post.likes = post.likes.filter(like => !like.equals(new mongoose.Types.ObjectId(user)))
            userActivity.likes = userActivity.likes.filter(like => !like.equals(new mongoose.Types.ObjectId(postID)))
        } else {
            post.likes.push(user)
            userActivity.likes.push(post._id)
        }
        await post.save()
        await userActivity.save()
        res.status(200).json({ post })
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

export const dislikePost = async (req, res) => {
    try {
        const { postID, user } = req.body
        checkInput(['postID', 'user'], req.body);
        
        const post = await Post.findOne({
            _id: postID
        })
        if (!post || post.deleted) {
            throw Error('Post does not exist')
        }
        const userActivity = await UserActivity.findOne({ user })
        if (!userActivity || userActivity.deleted) {
            throw Error('User activity does not exist')
        }
        //if they have already liked remove their like and if they haven't liked it add their like
        if (post.dislikes.includes(new mongoose.Types.ObjectId(user))) {
            post.dislikes = post.dislikes.filter(dislike => !dislike.equals(new mongoose.Types.ObjectId(user)))
            userActivity.dislikes = userActivity.dislikes.filter(dislike => !dislike.equals(new mongoose.Types.ObjectId(postID)))
        } else {
            post.dislikes.push(user)
            userActivity.dislikes.push(post._id)
        }
        await post.save()
        await userActivity.save()
        res.status(200).json({ post })
    }
    catch (error) {
        res.status(401).json({ error: error.message })
    }
}

export const editPost = async (req, res) => {
    try {
        const { postID, title, content, user } = req.body;
        checkInput(['postID', 'title', 'content', 'user'], req.body);
        const post = await Post.findOne({ _id: postID });
        if (!post || post.deleted) {
            throw Error('Post does not exist');
        }
        if (!post.user.equals(new mongoose.Types.ObjectId(user))) {
            throw Error('User is not authorized to edit this post');
        }
        if(title) post.title = title;
        if(content) post.content = content;
        await post.save();
        res.status(200).json({ post });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}




