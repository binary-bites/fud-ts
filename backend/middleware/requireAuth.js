import User from '../models/userModel.ts';
import { getAuth } from 'firebase-admin/auth';

const requireAuth = async (req, res, next) => {
    if(req.body.adminPassword || req.query.adminPassword) {
        if((req.body.adminPassword === process.env.ADMIN_PASSWORD || req.query.adminPassword === process.env.ADMIN_PASSWORD) && (req.body.user || req.query.user)) {
            if(!req.body.user) {
                req.body.user = req.query.user;
            }
            next();
            return;
        }
    }
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        return res.status(403).send('Unauthorized');
      }
    
      const token = req.headers.authorization.split('Bearer ')[1];
    
      try {
        const decodedToken = await getAuth().verifyIdToken(token,true);
        let firebaseToken = null
        firebaseToken = decodedToken.uid
        if(firebaseToken === null){
            throw new Error('Invalid token')
        }
        req.user = decodedToken; // Add the decoded user to the request object

        const userObject = await User.findOne({ firebaseID: firebaseToken, deleted: false });
        if (!userObject) {
            throw new Error('User not found');
        }
        req.body.user = userObject._id;
        req.body.personalFirebaseToken = token;
        next();
      } catch (error) {
        console.error('Error verifying Firebase ID token:', error);
        res.status(403).send('Unauthorized');
      }
}

export default requireAuth