import { Router } from "express";
import { LoginController } from "../controller/loginController.js";
import { LoginService } from "../service/loginService.js";
import { UserRepository } from "../repository/userRepository.js";

const router = Router();
const repository = new UserRepository();
const service = new LoginService(repository);
const controller = new LoginController(service);

router.post('/login', controller.login.bind(controller));

router.post('/refresh', controller.refresh.bind(controller));

router.post('/logout', controller.logout.bind(controller));

export default router;