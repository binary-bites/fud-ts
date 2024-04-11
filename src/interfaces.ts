// modified to support ts from: https://mongoosejs.com/docs/typescript.html

enum RatingType {
  ambience,
  price,
  flavor,
  difficulty
}

export interface IRating {
  ratingType: RatingType;
  stars: number;
}


export interface IPost {
    //leading underscore to match mongodb schema, not worth translating in code
    _id: string;
    title: string;
    content: string;
    date: Date;
    deleted: boolean;
    userID: string;
    likes: IUser[];
    dislikes: IUser[];
    comments: IComment[];
    ratings: IRating[];
    images: Array<string>;
}

export interface IImage {
    url: string;
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

export interface IProfile {
    bio: string;
    profilePicture: string;
    followers: string[];
    following: string[];
    savedPosts: string[];
    firstName: string
    lastName: string
    profileFile: File | null;
}

export interface IComment {
    _id: string;
    user: IUser;
    post: IPost;
    content: string;
    date: Date;
    deleted: boolean;
    likes: IUser;
    dislikes: IUser;
}
