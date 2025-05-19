import { IPurchaseRepository } from "../repository/interfaces/purchaseRepoInterface.js";
import { IHistoricService } from "./interfaces/historicServiceInterface.js";

export class HistoricService implements IHistoricService {
    constructor(private repository: IPurchaseRepository){}
    
    async get(userId: string) {
        const purchases = await this.repository.get(userId);
        if(purchases.length === 0) throw new Error('Nenhuma compra encontrada');

        const historic = purchases.map(purchase => {
            return {
                id: purchase._id,
                fullName: purchase.fullName,
                state: purchase.state,
                city: purchase.city,
                street: purchase.street,
                houseNumber: purchase.houseNumber,
                cep: purchase.cep,
                cart: purchase.cart,
                total: purchase.total,
                currency: purchase.currency,
                date: purchase.createdAt,
            }
        })

        return historic;
    }
}