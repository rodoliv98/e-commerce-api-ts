import { Router } from "express";
import { checkLogin } from "../middleware/checkLogin";
import { HistoricController } from "../controller/historicController.js";
import { HistoricService } from "../service/historicService.js";
import { PurchaseRepository } from "../repository/purchaseRepository.js";

const router = Router();
const repository = new PurchaseRepository();
const service = new HistoricService(repository);
const controller = new HistoricController(service);

router.get('/historic', checkLogin, controller.get.bind(controller));

export default router;