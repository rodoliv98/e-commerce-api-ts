import { Router } from "express";
import { checkLogin } from "../middleware/checkLogin"
import { PurchaseController } from "../controller/purchaseController"
import { PurchaseService } from "../service/purchaseService"
import { PurchaseRepository } from "../repository/purchaseRepository"

const router = Router();
const repository = new PurchaseRepository();
const service = new PurchaseService(repository);
const controller = new PurchaseController(service);

router.post('/purchase', checkLogin, controller.payment.bind(controller));

export default router;
