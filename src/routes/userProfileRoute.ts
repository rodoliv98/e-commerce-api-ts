import { Router } from "express";
import { checkLogin } from "../middleware/checkLogin";
import { UserProfileController } from "../controller/userProfileController";
import { UserProfileRepository } from "../repository/userProfileRepository";
import { UserProfileService } from "../service/userProfileService";
import { UserRepository } from "../repository/userRepository";

const router = Router();
const profileRepo = new UserProfileRepository();
const userRepo = new UserRepository();
const service = new UserProfileService({ profile: profileRepo, user: userRepo });
const controller = new UserProfileController(service);

router.get('/', checkLogin, controller.showUser.bind(controller));

router.get('/profile', checkLogin, controller.showProfile.bind(controller));

router.post('/profile', checkLogin, controller.create.bind(controller));

router.patch('/profile', checkLogin, controller.patch.bind(controller));

export default router;
