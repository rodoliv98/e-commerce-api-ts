import { NextFunction, Request, Response } from "express";
import { IHistoricService } from "../service/interfaces/historicServiceInterface.js";

export class HistoricController {
    constructor(private service: IHistoricService){}
    
    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userId;
            if (!userId) throw new Error('UserID não encontrado');

            const historic = await this.service.get(userId);
            return res.status(200).json(historic);

        } catch (err) {
            next(err);
        }
    }
}