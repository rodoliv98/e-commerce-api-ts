import mongoose from "mongoose";

export interface IUserAddress {
    _id: mongoose.Types.ObjectId;
    userID: string;
    country: string;
    state: string;
    city: string;
    street: string;
    houseNumber: string;
    cep: string;
}

export interface CreateUserAddressDTO {
    userID: string;
    country: string;
    state: string;
    city: string;
    street: string;
    houseNumber: string;
    cep: string;
}

export interface PatchUserAddressDTO {
    userID: string;
    country?: string;
    state?: string;
    city?: string;
    street?: string;
    houseNumber?: string;
    cep?: string;
}

const userAddressSchema = new mongoose.Schema({
    country: { type: String, required: [function(this: any) { return this.isNew; }, 'País é obrigatório'] },
    state: { type: String, required: [function(this: any) { return this.isNew; }, 'Estado é obrigatório'] },
    city: { type: String, required: [function(this: any) { return this.isNew; }, 'Cidade é obrigatória'] },
    street: { type: String, required: [function(this: any) { return this.isNew; }, 'Rua é obrigatória'] },
    houseNumber: { type: String, required: [function(this: any) { return this.isNew; }, 'Número é obrigatório'] },
    cep: { type: String, required: [function(this: any) { return this.isNew; }, 'CEP é obrigatório'] },
    userID: { type: String, required: true },
}, { versionKey: false })

export const UserAddress = mongoose.model<IUserAddress>('UserAddress', userAddressSchema);