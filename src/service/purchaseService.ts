import { CreatePurchaseDTO } from "../../models/purchase";
import { getCartTotal } from "../utils/getCartTotal";
import { IPurchaseRepository } from "../repository/interfaces/purchaseRepoInterface";
import { reduceQuantityInDatabase } from "../utils/reduceQuantity";
import { IPurchase } from "../../models/purchase";
import { IPurchaseService } from "./interfaces/purchaseServiceInterface";
import { checkIfProductExist } from "../utils/checkIfProductExist";


export class PurchaseService implements IPurchaseService {
    constructor(private repo: IPurchaseRepository) {}
    
    async payment(data: CreatePurchaseDTO): Promise<IPurchase> {
        await checkIfProductExist(data);
        getCartTotal(data.cart, data.total);
        const purchase = await this.repo.payment(data);
        await reduceQuantityInDatabase(data.cart);

        return purchase;
    }
}