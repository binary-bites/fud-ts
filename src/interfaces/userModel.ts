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