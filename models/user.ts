import mongoose from "mongoose";

export interface IUser {
    _id: mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    emailVerified: boolean;
}

export interface CreateUserDTO {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const createUser = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    emailVerified: { type: Boolean, default: false },
    },
    { versionKey: false },
)

export const User = mongoose.model<IUser>('User', createUser);