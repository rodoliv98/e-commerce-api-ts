import { NextFunction, Request, Response } from "express";
import { IPurchaseService } from "../service/interfaces/purchaseServiceInterface.js";
import { z } from "zod";

const purchaseSchema = z.object({
    fullName: z.string(),
    cpf: z.string(),
    birthDate: z.string(),
    country: z.string(),
    state: z.string(),
    city: z.string(),
    street: z.string(),
    houseNumber: z.string(),
    cep: z.string(),
    cart: z.array(z.object({
        productId: z.string(),
        quantity: z.number(),
        price: z.number(),
        item: z.string(),
    })),
    cardNumber: z.string(),
    total: z.number(),
    currency: z.string(),
})

export class PurchaseController {
    constructor(private service: IPurchaseService) {}
    
    async payment(req: Request, res: Response, next: NextFunction) {
        
        try {
            const id = req.userId;
            if(!id) throw new Error('UserID não encontrado');
            
            const body = purchaseSchema.parse(req.body);
            const data = { ...body, userId: id };
            const purchase = await this.service.payment(data);
            res.json({ message: 'Payment', purchaseId: purchase._id });

        } catch (err) {
            next(err);
        }
    }    
}