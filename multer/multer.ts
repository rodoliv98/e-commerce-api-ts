import multer from "multer";
import { NextFunction, Request, Response } from "express";

const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, 'public/images');
    },
    filename: (req: any, file: any, cb: any) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage }).array("images", 15);

export function uploadMiddleware(req: Request, res: Response, next: NextFunction): void {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            console.log(err);
            return res.status(500).json({ message: "Erro ao processar o arquivo" });
        } else if (err) {
            console.log(err);
            return res.status(500).json({ message: "Erro ao processar o arquivo" });
        }
        next();
    });
}