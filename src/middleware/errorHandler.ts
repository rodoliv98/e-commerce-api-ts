import { Request, Response, NextFunction } from "express";
import { parseZodError } from "../utils/zodError.js";
import { ZodError } from "zod";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ZodError) {
        const simplified = parseZodError(err);
        console.log(simplified);
        return res.status(400).json({ error: simplified });
    }
    const status = err.status || 400;
    process.env.NODE_ENV === 'production' ? console.error(err) : console.error(err.message);
    return res.status(status).json({ error: err.message });
}