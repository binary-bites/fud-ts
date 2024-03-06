import { Schema, model } from 'mongoose'

export interface IUser {
  username: string;
  dateOfBirth: Date | null;
  firstName: string;
  lastName: string;
  email: string | null;
  deleted: boolean;
  firebaseID: string | null;
}

const userSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    dateOfBirth: { type: Date, default: null},
    firstName: { type: String, required: true},
    lastName: { type: String, default: ""},
    email: { type: String, default: null},
    deleted: { type: Boolean, default: false },
    firebaseID: { type: String, default: null },
}) 

export default model('User', userSchema)
