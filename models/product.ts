import mongoose from 'mongoose';

export interface IProduct {
    _id: mongoose.Types.ObjectId;
    item: string;
    price: number;
    quantity: number;
    imagePath: string;
    category: string;
}

export interface ProductDTO {
    item: string;
    price: number;
    quantity: number;
    imagePath: string;
    category: string;
}

export interface ProductPatchDTO {
    item?: string;
    price?: number;
    quantity?: number;
    imagePath?: string;
    category?: string;
}

const productSchema = new mongoose.Schema({
    item: { type: String, required: [function(this: any) { return this.isNew; }, 'Item is required'], unique: true },
    price: { type: Number, required: [function(this: any) { return this.isNew; }, 'Price is required'] },
    quantity: { type: Number, required: [function(this: any) { return this.isNew; }, 'Quantity is required'] },
    imagePath: { type: String, required: [function(this: any) { return this.isNew; }, 'Image path is required'] },
    category: { type: String, required: [function(this: any) { return this.isNew; }, 'Category is required'] },
}, { versionKey: false })

export const Product = mongoose.model<IProduct>('Product', productSchema);
