import { IRegisterService } from './interfaces/registerServiceInterface.js';
import { IUserRepository } from '../repository/interfaces/userRepoInterface.js';
import { sendVerificationEmail, sendRecoverPasswordEmail } from '../../nodeMailer/emailService.js';
import { CreateUserDTO } from '../../models/user.js';
import { createToken, verifyToken } from '../utils/createToken.js';
import bcrypt from 'bcrypt';

export class RegisterService implements IRegisterService {
    constructor(private repository: IUserRepository) {}

    async create(data: CreateUserDTO): Promise<void> {
        data.password = await bcrypt.hash(data.password, 10);

        const user = await this.repository.create(data);
        if(!user) throw new Error('Usuário não criado');

        const token = createToken(user._id.toString());
        await sendVerificationEmail(user.email, token);

        return;
    }

    async verify(token: string): Promise<void> {
        const decoded = verifyToken(token);
        const user = await this.repository.verify(decoded.userId);
        if(!user) throw new Error('Usuário não encontrado');

        return;
    }

    async recoverPassword(email: string): Promise<void> {
        const user = await this.repository.recoverPassword(email);
        if(!user) throw new Error('Usuário não encontrado');

        const token = createToken(user._id.toString());
        await sendRecoverPasswordEmail(user.email, token);

        return;
    }

    async updatePassword(password: string, token: string): Promise<void> {
        const decoded = verifyToken(token);
        const hash = await bcrypt.hash(password, 10);
        
        const user = await this.repository.updatePassword(hash, decoded.userId);
        if(!user) throw new Error('Usuário não encontrado');

        return;
    }
}