import { ProductDTO, IProduct, ProductPatchDTO } from "../../models/product.js";
import { IProductRepository } from "../repository/interfaces/productRepoInterface.js";
import { IProductService } from "./interfaces/productServiceInterface.js";

export class ProductService implements IProductService {
    constructor(private repository: IProductRepository) {}

    async findAll(): Promise<IProduct[]> {
        return await this.repository.findAll();
    }
    
    async findById(id: string): Promise<IProduct> {
        const product = await this.repository.findById(id);
        if (!product) throw new Error('Produto não encontrado');
        
        return product;
    }
    
    async create(data: ProductDTO): Promise<IProduct> {
        return await this.repository.create(data);
    }

    async patch(id: string, data: ProductPatchDTO): Promise<IProduct> {
        const product = await this.repository.patch(id, data);
        if (!product) throw new Error('Erro ao atualizar produto');
        
        return product;
    }

    async delete(id: string): Promise<IProduct> {
        const product = await this.repository.delete(id);
        if (!product) throw new Error('Erro ao deletar produto');
        
        return product;
    }
}