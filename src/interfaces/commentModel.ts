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
