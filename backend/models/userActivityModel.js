import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema

const userActivity = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    deleted: { type: Boolean, default: false },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
});

export default model('UserActivity', userActivity)