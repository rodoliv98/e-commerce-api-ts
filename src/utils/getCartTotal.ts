export function getCartTotal(array: Array<{ productId: string; price: number; quantity: number, item: string }>, cartTotal: number) {
    let sum = 0;

    for(let i = 0; i < array.length; i++){
        const price = array[i].price;
        const quantity = array[i].quantity;
        const total = price * quantity;
        sum += total;
    }

    if(sum !== cartTotal){
        throw new Error('Total price sent by the frontend dont match');
    }
}