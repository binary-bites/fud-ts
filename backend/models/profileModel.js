import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema

const profileSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, default: "" },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bio: { type: String, default: "" },
    profilePicture: { type: String, default: "" },
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    savedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    deleted: { type: Boolean, default: false }
});

export default model('Profile', profileSchema)