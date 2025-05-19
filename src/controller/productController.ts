import { NextFunction, Request, Response } from "express";
import { IProductService } from "../service/interfaces/productServiceInterface.js";
import { z } from "zod";

const createProductSchema = z.object({
    item: z.string().regex(/^(?=.{1,50}$)[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/),
    price: z.number(),
    quantity: z.number(),
    imagePath: z.string(),
    category: z.string().regex(/^(?=.{1,30}$)[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/),
});

const updateProductSchema = z.object({
    item: z.string().regex(/^(?=.{1,50}$)[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/).optional(),
    price: z.number().optional(),
    quantity: z.number().optional(),
    imagePath: z.string().optional(),
    category: z.string().regex(/^(?=.{1,30}$)[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/).optional(),
});

export class ProductController {
    constructor(private service: IProductService) {}

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await this.service.findAll();
            return res.status(200).json(products);

        } catch (err) {
            next(err);
        }
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            const product = await this.service.findById(id);
            return res.status(200).json(product);

        } catch (err) {
            next(err);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = createProductSchema.parse(req.body);
            const product = await this.service.create(data);
            return res.status(201).json({ message: 'Produto criado com sucesso', product });

        } catch (err) {
            next(err);
        }
    }

    async patch(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            const data = updateProductSchema.parse(req.body);
            const product = await this.service.patch(id, data);            
            return res.status(200).json({ message: 'Produto atualizado com sucesso', product });

        } catch (err) {
            next(err);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            const product = await this.service.delete(id);
            return res.status(200).json({ message: 'Produto deletado com sucesso', product });

        } catch (err) {
            next(err);
        }
    }
}
