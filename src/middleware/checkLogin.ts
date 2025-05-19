import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/createToken";

export function checkLogin(req: Request, res: Response, next: NextFunction) {
    const data = req.cookies.accessToken;
    if (!data) return res.status(401).json({ message: 'Não autenticado' });

    try {
        const decoded = verifyToken(data);
        
        req.userId = decoded.userId;
        req.role = decoded.role;
        
        next();

    } catch (err) {
        return res.status(401).json({ message: 'Não autenticado' });
    }

}