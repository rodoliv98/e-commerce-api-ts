import { CreateUserDTO } from "../../../models/user.js";

export interface IRegisterService {
    create(data: CreateUserDTO): Promise<void>;
    verify(token: string): Promise<void>;
    recoverPassword(email: string): Promise<void>;
    updatePassword(password: string, token: string): Promise<void>;
}