import { IUserRepository } from '../repository/interfaces/userRepoInterface.js';
import { createAccessAndRefreshTokens, verifyToken } from '../utils/createToken.js';
import { sendVerificationEmail } from '../../nodeMailer/emailService.js';
import bcrypt from 'bcrypt';

export interface LoginDTO {
    email: string;
    password: string;
}

export class LoginService {
    constructor(private repository: IUserRepository) {}
    
    async login(data: LoginDTO): Promise<string[]> {
        const user = await this.repository.login(data.email);
        if(!user) throw new Error('Usuário não encontrado');

        if(!user.emailVerified){
            await sendVerificationEmail(user.email, user._id.toString());
            throw new Error('Email não verificado');
        }
        
        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if(!isPasswordValid) throw new Error('Senha inválida');

        const [accessToken, refreshToken] = createAccessAndRefreshTokens(user._id.toString(), user.role);
        return [accessToken, refreshToken];
    }    

    async refresh(refreshToken: string): Promise<string[]> {
        const decodedToken = verifyToken(refreshToken);
        const user = await this.repository.refresh(decodedToken.userId);
        if(!user) throw new Error('Usuário não encontrado');

        const [accessToken, newRefreshToken] = createAccessAndRefreshTokens(user._id.toString(), user.role);
        return [accessToken, newRefreshToken];
    }
}
