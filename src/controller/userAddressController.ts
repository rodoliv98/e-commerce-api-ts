import { IUserAddressService } from "../service/interfaces/userAddressService.js";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const createAddressSchema = z.object({
    country: z.string(),
    state: z.string(),
    city: z.string(),
    street: z.string(),
    houseNumber: z.string(),
    cep: z.string().regex(/^\d{5}-\d{3}$/, 'Cep inválido'),
})

const patchAddressSchema = z.object({
    country: z.string().optional(),
    state: z.string().optional(),
    city: z.string().optional(),
    street: z.string().optional(),
    houseNumber: z.string().optional(),
    cep: z.string().regex(/^\d{5}-\d{3}$/, 'Cep inválido').optional(),
})

export class UserAddressController {
    constructor(private service: IUserAddressService) {}
    
    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.userId;
            if (!id) throw new Error('UserID não encontrado');
            
            const address = await this.service.findAll(id);
            return res.status(200).json(address);

        } catch (err) {
            next(err);
        }
    }
    
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.userId;
            if (!id) throw new Error('UserID não encontrado');

            const body = createAddressSchema.parse(req.body);
            const data = { ...body, userID: id };

            const address = await this.service.create(data);
            return res.status(201).json(address);

        } catch (err) {
            next(err);
        }
    }

    async patch(req: Request, res: Response, next: NextFunction) {
        try {
            const { addressId } = req.params;
            if (!addressId) throw new Error('ID não encontrado');
            
            const id = req.userId;
            if (!id) throw new Error('UserID não encontrado');

            const body = patchAddressSchema.parse(req.body);
            const data = { ...body, userID: id };

            const address = await this.service.patch(addressId, data);
            return res.status(200).json(address);

        } catch (err) {
            next(err);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { addressId } = req.params;
            if (!addressId) throw new Error('ID não encontrado');
            
            const id = req.userId;
            if (!id) throw new Error('UserID não encontrado');

            const address = await this.service.delete(id, addressId);
            return res.status(200).json(address);

        } catch (err) {
            next(err);
        }
    }
}