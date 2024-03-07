// modified to support ts from: https://mongoosejs.com/docs/typescript.html
export interface IPost {
    id: string;
    title: string;
    content: string;
    date: Date;
    deleted: boolean;
    userID: string;
    likes: IUser[];
    dislikes: IUser[];
    comments: IComment[];
    ratings: {
        ratingType: string;
        stars: number;
    }[];
    images: Array<string>;
}

export interface IUser {
  username: string;
  dateOfBirth: Date | null;
  firstName: string;
  lastName: string;
  email: string | null;
  deleted: boolean;
  firebaseID: string | null;
}

export interface IComment {
    id: string;
    user: IUser;
    post: IPost;
    content: string;
    date: Date;
    deleted: boolean;
    likes: IUser;
    dislikes: IUser;
}
