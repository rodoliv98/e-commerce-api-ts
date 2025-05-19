import { CreatePurchaseDTO } from "../../models/purchase.js";
import { IProductRepository } from "../repository/interfaces/productRepoInterface.js";
import { getCartTotal } from "../utils/getCartTotal.js";
import { IPurchaseRepository } from "../repository/interfaces/purchaseRepoInterface.js";
import { reduceQuantityInDatabase } from "../utils/reduceQuantity.js";
import { IPurchase } from "../../models/purchase.js";
import { IPurchaseService } from "./interfaces/purchaseServiceInterface.js";

interface repos {
    product: IProductRepository;
    purchase: IPurchaseRepository;
}

export class PurchaseService implements IPurchaseService {
    constructor(private repos: repos) {}
    
    async payment(data: CreatePurchaseDTO): Promise<IPurchase> {
        for (let i = 0; i < data.cart.length; i++) {
            const product = await this.repos.product.findById(data.cart[i].productId);
            if (!product) throw new Error('Produto não encontrado');
            if (product.price !== data.cart[i].price) throw new Error('Preço do produto não corresponde ao enviado');
        }
        
        getCartTotal(data.cart, data.total);
        const purchase = await this.repos.purchase.payment(data);
        await reduceQuantityInDatabase(data.cart);

        return purchase;
    }
}