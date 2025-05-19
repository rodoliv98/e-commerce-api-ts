import { Router, Request, Response } from "express";
import { checkLogin } from "../middleware/checkLogin.js";
import { uploadMiddleware } from "../../multer/multer.js";

const router = Router();

router.get('/', checkLogin, (req: Request, res: Response) => {
    const isAdmin = req.role;
    if (isAdmin !== 'admin') return res.status(401).json({ message: 'Não autorizado' });
    res.json({ message: 'Autorizado' });
})

router.post('/upload-image', checkLogin, uploadMiddleware, (req: Request, res: Response) => {
    console.log(req.file);
    res.json({ message: 'Imagem enviada com sucesso', file: req.file });
})

export default router;