import { IUser } from "../../../models/user.js";
import { CreateUserDTO } from "../../../models/user.js";

export interface IUserRepository {
    login(email: string): Promise<IUser | null>;
    refresh(userId: string): Promise<IUser | null>;
    create(data: CreateUserDTO): Promise<IUser>;
    verify(userId: string): Promise<IUser | null>;
    showUser(userId: string): Promise<IUser | null>;
    recoverPassword(email: string): Promise<IUser | null>;
    updatePassword(password: string, userId: string): Promise<IUser | null>;
}