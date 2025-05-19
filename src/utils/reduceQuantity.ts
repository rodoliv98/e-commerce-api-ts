import { Product } from "../../models/product";

export async function reduceQuantityInDatabase(array: Array<{ productId: string; quantity: number, item: string, price: number }>) {
    for(let i = 0; i < array.length; i++){

        const quantity = array[i].quantity;
        const findItem = await Product.findById(array[i].productId);

        if(!findItem){
            throw new Error('Produto não encontrado');
        }

        if(findItem.quantity < array[i].quantity || array[i].quantity <= 0){
            throw new Error('Estoque insuficiente');
        } 

        const updatedQuantity = { quantity: findItem.quantity - quantity };
        await Product.findByIdAndUpdate(array[i].productId, updatedQuantity);
    }
}