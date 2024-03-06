import User from '../models/userModel.js'
import Profile from '../models/profileModel.js'
import UserActivity from '../models/userActivityModel.js'
import Comment from '../models/commentModel.js'
import Post from '../models/postModel.ts'
import  checkInput  from '../utils/utils.js'

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({ deleted: false }).populate('user').sort({ createdAt: -1 })
        res.status(200).json({ posts })
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}
