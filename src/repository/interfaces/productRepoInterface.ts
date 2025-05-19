import { IProduct, ProductDTO, ProductPatchDTO } from "../../../models/product.js";

export interface IProductRepository {
    findAll(): Promise<IProduct[]>;
    findById(id: string): Promise<IProduct | null>;
    create(data: ProductDTO): Promise<IProduct>;
    patch(id: string, data: ProductPatchDTO): Promise<IProduct | null>;
    delete(id: string): Promise<IProduct | null>;
}