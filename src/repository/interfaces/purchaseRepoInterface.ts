import { CreatePurchaseDTO } from "../../../models/purchase.js";
import { IPurchase } from "../../../models/purchase.js";

export interface IPurchaseRepository {
    payment(data: CreatePurchaseDTO): Promise<IPurchase>
    get(userId: string): Promise<IPurchase[]>
}