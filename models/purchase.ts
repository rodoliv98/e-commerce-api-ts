import mongoose from "mongoose";

export interface IPurchase {
    _id: mongoose.Types.ObjectId;
    fullName: string;
    cpf: string;
    birthDate: string;
    country: string;
    state: string;
    city: string;
    street: string;
    houseNumber: string;
    cep: string;
    cart: Array<{ productId: string; quantity: number; price: number; item: string }>;
    cardNumber: string;
    total: number;
    currency: string;
    userId: string;
    createdAt: Date;
}

export interface CreatePurchaseDTO {
    fullName: string;
    cpf: string;
    birthDate: string;
    country: string;
    state: string;
    city: string;
    street: string;
    houseNumber: string;
    cep: string;
    cart: Array<{ productId: string; quantity: number; price: number; item: string }>;
    cardNumber: string;
    total: number;
    currency: string;
    userId: string;
}

const cartSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    item: { type: String, required: true },
}, { versionKey: false })

const createPurchase = new mongoose.Schema({
    fullName: { type: String, required: true, trim: true },
    cpf: { type: String, required: true, trim: true },
    birthDate: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    street: { type: String, required: true, trim: true },
    houseNumber: { type: String, required: true, trim: true },
    cep: { type: String, required: true, trim: true },
    cart: { type: [cartSchema], required: true },
    cardNumber: { type: String, required: true, trim: true },
    total: { type: Number, required: true },
    currency: { type: String, required: true, trim: true },
    userId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
}, { versionKey: false })

export const Purchase = mongoose.model<IPurchase>('Purchase', createPurchase);