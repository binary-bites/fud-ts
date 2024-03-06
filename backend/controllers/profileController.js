import User from '../models/userModel.ts'
import Profile from '../models/profileModel.js'
import UserActivity from '../models/userActivityModel.js'
import Comment from '../models/commentModel.ts'
import Post from '../models/postModel.ts'
import  checkInput  from '../utils/utils.js'

//MAKE PROFILE PICTURE EDIT WORK
export const editProfile = async (req, res) => {
    try {
        const { profilePicture, bio, user } = req.body
        const profile = await Profile.findOne({ user });
        if (!profile) {
            throw Error('Profile does not exist');
        }
        if(bio) profile.bio = bio;
        await profile.save();
        res.status(200).json({ profile });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}
