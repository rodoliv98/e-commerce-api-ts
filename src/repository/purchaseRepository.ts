import { IPurchaseRepository } from "./interfaces/purchaseRepoInterface.js";
import { CreatePurchaseDTO } from "../../models/purchase.js";
import { IPurchase } from "../../models/purchase.js";
import { Purchase } from "../../models/purchase.js";

export class PurchaseRepository implements IPurchaseRepository {
    async payment(data: CreatePurchaseDTO): Promise<IPurchase> {
        return await Purchase.create(data);
    }

    async get(userId: string): Promise<IPurchase[]> {
        return await Purchase.find({ userId: userId }).lean().exec();
    }
}