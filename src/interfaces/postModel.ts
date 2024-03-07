import {Types} from 'mongoose';
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