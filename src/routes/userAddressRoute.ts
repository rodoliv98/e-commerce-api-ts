import { Router } from "express";
import { checkLogin } from "../middleware/checkLogin";
import { UserAddressController } from "../controller/userAddressController";
import { UserAddressRepository } from "../repository/userAddressRepository";
import { UserAddressService } from "../service/userAddressService";

const router = Router();
const repository = new UserAddressRepository();
const service = new UserAddressService(repository);
const controller = new UserAddressController(service);

router.get('/address', checkLogin, controller.findAll.bind(controller));

router.post('/address', checkLogin, controller.create.bind(controller));

router.patch('/address/:addressId', checkLogin, controller.patch.bind(controller));

router.delete('/address/:addressId', checkLogin, controller.delete.bind(controller));

export default router;
