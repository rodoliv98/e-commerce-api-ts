import { NextFunction, Request, Response } from "express";
import { IUserProfileService } from "../service/interfaces/userProfileServiceInterface.js";
import { z } from "zod";

const createProfileSchema = z.object({
    fullName: z.string().regex(/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)+$/),
    cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
    birthDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/),
});

const patchProfileSchema = z.object({
    fullName: z.string().regex(/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)+$/).optional(),
    cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/).optional(),
    birthDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/).optional(),
});

export class UserProfileController {
    constructor(private service: IUserProfileService) {}
    
    async showUser(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.userId;
            if (!id) throw new Error('UserID não encontrado');
            
            const [firstName, email] = await this.service.showUser(id);
            return res.status(200).json({ msg: firstName, email: email });

        } catch (err) {
            next(err);
        }
    }

    async showProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.userId;
            if (!id) throw new Error('UserID não encontrado');
            
            const profile = await this.service.showProfile(id);
            return res.status(200).json(profile);

        } catch (err) {
            next(err);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.userId;
            if (!id) throw new Error('UserID não encontrado');

            const body = createProfileSchema.parse(req.body);
            const data = { ...body, userId: id };
            const profile = await this.service.create(data);
            return res.status(201).json(profile);

        } catch (err) {
            next(err);
        }
    }

    async patch(req: Request, res: Response, next: NextFunction) {
        try {            
            const id = req.userId;
            if (!id) throw new Error('UserID não encontrado');

            const body = patchProfileSchema.parse(req.body);
            const data = { ...body, userId: id };

            const profile = await this.service.patch(data);
            return res.status(200).json(profile);

        } catch (err) {
            next(err);
        }
    }
}
