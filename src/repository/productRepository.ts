import { Product, IProduct, ProductDTO, ProductPatchDTO } from "../../models/product.js";
import { IProductRepository } from "./interfaces/productRepoInterface.js";

export class ProductRepository implements IProductRepository {
    async findAll(): Promise<IProduct[]> {
        return await Product.find().lean().exec();
    }

    async findById(id: string): Promise<IProduct | null> {
        return await Product.findById(id).lean().exec();
    }

    async create(data: ProductDTO): Promise<IProduct> {
        return await Product.create(data);
    }

    async patch(id: string, data: ProductPatchDTO): Promise<IProduct | null> {
        return await Product.findByIdAndUpdate(id, data, { new: true }).lean().exec();
    }

    async delete(id: string): Promise<IProduct | null> {
        return await Product.findByIdAndDelete(id).lean().exec();
    }
}
