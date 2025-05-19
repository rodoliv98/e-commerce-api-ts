import mongoose from "mongoose";

export interface IUserProfile {
    _id: mongoose.Types.ObjectId;
    fullName: string;
    cpf: string;
    birthDate: string;
    userId: string;
}

export interface CreateIUserProfileDTO {
    fullName: string;
    cpf: string;
    birthDate: string;
    userId: string;
}

export interface PatchIUserProfileDTO {
    fullName?: string;
    cpf?: string;
    birthDate?: string;
    userId: string;
}

const userProfileSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    birthDate: { type: String, required: true },
    userId: { type: String, required: true },
}, { versionKey: false })

export const UserProfile = mongoose.model<IUserProfile>('UserProfile', userProfileSchema);