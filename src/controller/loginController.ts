import { Request, Response, NextFunction } from 'express';
import { ILoginService } from '../service/interfaces/loginServiceInterface.js';
import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/)
})

export class LoginController {
    constructor(private service: ILoginService) {}

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const data = loginSchema.parse(req.body);
            const [accessToken, refreshToken] = await this.service.login(data);

            res
            .cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                maxAge: 15 * 60 * 60 * 1000
            })
            .cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            .status(200)
            .json({ message: 'Autenticado com sucesso' });

        } catch (err) {
            next(err);
        }
    }
    
    async refresh(req: Request, res: Response, next: NextFunction){
        try {
            const refreshToken = req.cookies.refreshToken;
            if(!refreshToken) throw new Error('Token de atualização não encontrado');
            const [accessToken, newRefreshToken] = await this.service.refresh(refreshToken);

            res
            .cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                maxAge: 15 * 60 * 1000
            })
            .cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            .status(200)
            .json({ message: 'Token de atualização gerado com sucesso' });
            
        } catch (err) {
            next(err);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction){
        try {
            const accessToken = req.cookies.accessToken;
            const refreshToken = req.cookies.refreshToken;
            if(!accessToken || !refreshToken) throw new Error('Token de atualização não encontrado');

            res
            .clearCookie('accessToken', {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
            })
            .clearCookie('refreshToken', {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
            })
            .status(200)
            .json({ message: 'Deslogado com sucesso' });

        } catch (err) {
            next(err);
        }
    }
}
    
