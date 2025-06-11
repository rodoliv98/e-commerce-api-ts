import { Router } from "express";
import { checkLogin } from "../middleware/checkLogin.js";
import { ProductService } from "../service/productService.js";
import { ProductRepository } from "../repository/productRepository.js";
import { ProductController } from "../controller/productController.js";

const router = Router();
const repository = new ProductRepository();
const service = new ProductService(repository);
const controller = new ProductController(service);

router.get('/test', (req, res) => {
    console.log('hi');
    res.status(200).send('hi');
})

router.get('/products', controller.findAll.bind(controller));

router.get('/products/:id', controller.findById.bind(controller));

router.post('/products', checkLogin, controller.create.bind(controller));

router.patch('/products/:id', checkLogin, controller.patch.bind(controller));

router.delete('/products/:id', checkLogin, controller.delete.bind(controller));

export default router;