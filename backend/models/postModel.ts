import {Schema, model, Types} from 'mongoose';
import {IUser} from './userModel';
import { IComment } from './commentModel';

// modified to support ts from: https://mongoosejs.com/docs/typescript.html
export interface IPost {
    title: string;
    content: string;
    date: Date;
    deleted: boolean;
    user: Types.ObjectId | IUser;
    likes: Array<Types.ObjectId> | IUser[];
    dislikes: Array<Types.ObjectId> | IUser[];
    comments: Array<Types.ObjectId> | IComment[];
    ratings: {
        ratingType: string;
        stars: number;
    }[];
    images: Array<string>;
}

const postSchema = new Schema<IPost>({
    title: {
      type: String,
      required: true,
    },
    content: { type: String, default: ""},
    date: { type: Date, default: Date.now},
    deleted: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    ratings: {
        type: [
            {
                ratingType: { type: String, default: null },
                stars: { type: Number, default: 0.0 },
            }
        ],
        default: [] 
    },
    images: [{ type: String, default: [] }],
});

const Post = model<IPost>('Post', postSchema)
export default Post
