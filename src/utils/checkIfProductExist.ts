import { CreatePurchaseDTO } from "../../models/purchase"
import { ProductRepository } from "../repository/productRepository";

const repo = new ProductRepository();

export async function checkIfProductExist(data: CreatePurchaseDTO) {
    for (let i = 0; i < data.cart.length; i++) {
        const product = await repo.findById(data.cart[i].productId);
        if (!product) {
            throw new Error(`Produto com ID: ${data.cart[i].productId} não encontrado`);
        }
        if (product.price !== data.cart[i].price) {
            throw new Error(`Preço do produto ${product._id} não corresponde. Esperado: ${product.price}, Recebido: ${data.cart[i].price}`);
        }
    }
}