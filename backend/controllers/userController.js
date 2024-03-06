import User from '../models/userModel.ts'
import Profile from '../models/profileModel.js'
import UserActivity from '../models/userActivityModel.js'
import Comment from '../models/commentModel.ts'
import Post from '../models/postModel.ts'
import checkInput from '../utils/utils.js'
import { getAuth } from 'firebase-admin/auth'

const signUpUserFirebase = async (req, res) => {
    try {
        console.log("made it to signup")
        console.log(req.body)
        const { username, dateOfBirth, firstName, lastName, email, firebaseID } = req.body
        //checkInput(['username', 'password', 'dateOfBirth', 'firstName', 'lastName', 'email', 'firebaseID'], req.body);

        // Assuming req.body.username and req.body.firebaseID contain the values to check
        const check = await findOne({
        $or: [
            { username: req.body.username },
            { firebaseID: req.body.firebaseID }
        ]
        });

        console.log("CHECK", check)
        if (check) {
            throw Error('Username or Firebase ID already exists');
        }


        const user = new User({ username, dateOfBirth, firstName, lastName, email, firebaseID })
        await user.save()
        console.log(user)
        const profile = new Profile({ firstName, lastName, user: user._id })
        await profile.save()
        const userActivity = new UserActivity({ user: user._id })
        await userActivity.save()
        res.status(200).json({ user, profile, userActivity })
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

const loginUserFirebase = async (req, res) => { // should create an access token and a refresh token to cookies and send to the front end
    const {firebaseID} = req.body
  
    try {
      if (!firebaseID) {
        return res.status(401).json({error: 'Request is not authorized'})
      }
  
      const user = await User.findOne({firebaseID})
      //console.log(user)
      if(!user || user.deleted === true){
        throw new Error('User has been deleted')
      }
      
      const profile = await Profile.findOne({user: user._id})

      res.status(200).json(profile)
    } catch (error) {
      res.status(401).json({error: error.message})
    }
  }

  const checkCredentials = async (req, res) => {
    try {
        const { username, email } = req.body
        //checkInput(['username', 'password', 'dateOfBirth', 'firstName', 'lastName', 'email', 'firebaseID'], req.body);

        // Assuming req.body.username and req.body.firebaseID contain the values to check
        const checkUsername = await findOne({ username: username });
        const checkEmail = await findOne({ email: email });
console.log("HI")
        let usernameExists = false
        if (checkUsername) {
            usernameExists = true
        }
        let emailExists = false
        if (checkEmail) {
            emailExists = true
        }
        console.log(usernameExists, emailExists)
        res.status(200).json({usernameExists, emailExists})
        
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

  export default {loginUserFirebase, signUpUserFirebase, checkCredentials}