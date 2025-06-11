import { Router } from "express";

const router = Router();

router.get('/auth', (req, res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json({ message: 'Token de acesso não encontrado' });
    
    return res.status(200).json({ message: 'Autenticado' });
});

router.get('/status', (req, res) => {
    res.sendStatus(200);
})

export default router;
