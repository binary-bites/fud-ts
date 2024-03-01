import { Schema as _Schema, model } from 'mongoose'
const Schema = _Schema

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