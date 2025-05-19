import { Router } from "express";
import { RegisterController } from "../controller/registerController.js";
import { RegisterService } from "../service/registerService.js";
import { UserRepository } from "../repository/userRepository.js";

const router = Router();
const repository = new UserRepository();
const service = new RegisterService(repository);
const controller = new RegisterController(service);

router.post('/register', controller.create.bind(controller));

router.get('/verify-email/:token', controller.verify.bind(controller));

router.post('/recover-password', controller.recoverPassword.bind(controller));

router.post('/update-password', controller.updatePassword.bind(controller));

export default router;