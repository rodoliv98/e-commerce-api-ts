import { IProduct, ProductDTO, ProductPatchDTO } from "../../../models/product.js";

export interface IProductService {
    findAll(): Promise<IProduct[]>;
    findById(id: string): Promise<IProduct>;
    create(data: ProductDTO): Promise<IProduct>;
    patch(id: string, data: ProductPatchDTO): Promise<IProduct>;
    delete(id: string): Promise<IProduct>;
}