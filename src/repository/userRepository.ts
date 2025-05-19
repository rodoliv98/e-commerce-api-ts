import { IUserRepository } from "./interfaces/userRepoInterface.js";
import { User, IUser } from "../../models/user.js";
import { CreateUserDTO } from "../../models/user.js";

export class UserRepository implements IUserRepository {
    async login(email: string): Promise<IUser | null> {
        return await User.findOne({ email }).lean().exec();
    }
    
    async refresh(userId: string): Promise<IUser | null> {
        return await User.findById(userId).lean().exec();
    }

    async create(data: CreateUserDTO): Promise<IUser> {
        return User.create(data);
    }
    
    async verify(userId: string): Promise<IUser | null> {
        return User.findByIdAndUpdate(userId, { emailVerified: true }, { new: true }).lean().exec();
    }

    async recoverPassword(email: string): Promise<IUser | null> {
        return User.findOne({ email: email }).lean().exec();
    }

    async updatePassword(password: string, userId: string): Promise<IUser | null> {
        return User.findByIdAndUpdate(userId, { password: password }).lean().exec();
    }

    async showUser(userId: string): Promise<IUser | null> {
        return User.findOne({ _id: userId }).lean().exec();
    }
}
