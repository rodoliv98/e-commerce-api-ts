import { CreatePurchaseDTO } from "../../../models/purchase.js";
import { IPurchase } from "../../../models/purchase.js";

export interface IPurchaseService {
    payment(data: CreatePurchaseDTO): Promise<IPurchase>;
}