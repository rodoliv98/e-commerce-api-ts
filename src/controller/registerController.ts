import { Request, Response, NextFunction } from 'express';
import { IRegisterService } from '../service/interfaces/registerServiceInterface.js';
import { z } from 'zod';

const createUserSchema = z.object({
    firstName: z.string().min(5).max(20),
    lastName: z.string().min(5).max(20),
    email: z.string().email(),
    password: z.string().regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/, 'A senha deve conter pelo menos 10 caracteres e possuir simbolos e letras maiúsculas')
})

const recoverPasswordSchema = z.object({
    email: z.string().email(),
})

const newPasswordSchema = z.object({
    password: z.string().regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/, 'A senha deve conter pelo menos 10 caracteres e possuir simbolos e letras maiúsculas'),
})

export class RegisterController {
    constructor(private service: IRegisterService) {}

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = createUserSchema.parse(req.body);
            await this.service.create(data);
            
            return res.status(201).json({ message: 'Conta criada com sucesso' });

        } catch (err) {
            next(err);
        }
    }

    async verify(req: Request, res: Response, next: NextFunction) {
        try{
            const { token } = req.params;
            if(!token) throw new Error('Token inválido');
            await this.service.verify(token);
            return res.status(200).json({ message: 'Usuário verificado com sucesso' });

        } catch (err) {
            next(err);
        }
    }

    async recoverPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const data = recoverPasswordSchema.parse(req.body);
            await this.service.recoverPassword(data.email);
            return res.status(200).json({ message: 'Email de recuperação de senha enviado com sucesso' });
            
        } catch (err) {
            next(err);
        }
    }

    async updatePassword(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.query.token;
            if(!token || typeof token !== 'string') throw new Error('Token não encontrado');

            const data = newPasswordSchema.parse(req.body);
            await this.service.updatePassword(data.password, token);
            return res.status(200).json({ message: 'Senha alterada com sucesso' });
            
        } catch (err) {
            next(err);
        }
    }
}