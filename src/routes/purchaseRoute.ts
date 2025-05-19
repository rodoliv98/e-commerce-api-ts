import { Router } from "express";
import { checkLogin } from "../middleware/checkLogin.js";
import { PurchaseController } from "../controller/purchaseController.js";
import { PurchaseService } from "../service/purchaseService.js";
import { PurchaseRepository } from "../repository/purchaseRepository.js";
import { ProductRepository } from "../repository/productRepository.js";

const router = Router();
const repository = new PurchaseRepository();
const productRepository = new ProductRepository();
const service = new PurchaseService({ purchase: repository, product: productRepository });
const controller = new PurchaseController(service);

router.post('/purchase', checkLogin, controller.payment.bind(controller));

export default router;
