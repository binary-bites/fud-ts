import { Schema, model, Types } from 'mongoose'
import {IUser} from './userModel';
import { IPost } from './postModel';

export interface IComment {
    user: Types.ObjectId | IUser;
    post: Types.ObjectId | IPost;
    content: string;
    date: Date;
    deleted: boolean;
    likes: Types.ObjectId | IUser;
    dislikes: Types.ObjectId | IUser;
}

const commentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
})

export default model('Comment', commentSchema)
