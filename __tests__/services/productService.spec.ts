import { ProductService } from "../../src/service/productService"
import { IProductRepository } from "../../src/repository/interfaces/productRepoInterface"
import { IProduct } from "../../models/product";

describe('ProductService', () => {
    let service: ProductService;
    let repo: jest.Mocked<IProductRepository>;

    beforeEach(() => {
        jest.resetAllMocks();

        repo = {
            findAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            patch: jest.fn(),
            delete: jest.fn(),
        }

        service = new ProductService(repo);
    });

    function createMockId () {
        return '121212121212121212121212';
    };

    function createMockProduct (overrides = {}): IProduct {
        return {
            category: 'blusas',
            quantity: 20,
            ...overrides
        } as IProduct;
    };

    test('ProductService findAll 200', async () => {
        const fakeProduct = createMockProduct();

        repo.findAll.mockResolvedValue([fakeProduct]);
        
        const result = await service.findAll();

        expect(result).toEqual([fakeProduct]);
        expect(repo.findAll).toHaveBeenCalledTimes(1);
    });

    test('ProductService findAll DB ERROR', async () => {
        const error = new Error('Error');

        repo.findAll.mockRejectedValue(error);

        await expect(service.findAll()).rejects.toThrow('Error');
        expect(repo.findAll).toHaveBeenCalledTimes(1);
    });

    test('ProductService findById 200', async () => {
        const fakeId = createMockId();
        const fakeProduct = createMockProduct();

        repo.findById.mockResolvedValue(fakeProduct);

        const result = await service.findById(fakeId);

        expect(repo.findById).toHaveBeenCalledWith(fakeId);
        expect(result).toEqual(fakeProduct);
    });

    test('ProductService findById DB ERROR', async () => {
        const fakeId = createMockId();
        const error = new Error('Error');
        repo.findById.mockRejectedValue(error);

        await expect(service.findById(fakeId)).rejects.toThrow('Error');
        expect(repo.findById).toHaveBeenCalledTimes(1);
        expect(repo.findById).toHaveBeenCalledWith(fakeId);
    });

    test('ProductService findById product not found', async () => {
        const fakeId = createMockId();

        repo.findById.mockResolvedValue(null);

        await expect(service.findById(fakeId)).rejects.toThrow('Produto não encontrado');

        expect(repo.findById).toHaveBeenCalledWith(fakeId);
        expect(repo.findById).toHaveBeenCalledTimes(1);
    });

    test('ProductService create 200', async () => {
        const fakeProduct = createMockProduct();
        repo.create.mockResolvedValue(fakeProduct);

        const result = await service.create(fakeProduct);

        expect(repo.create).toHaveBeenCalledWith(fakeProduct);
        expect(result).toEqual(fakeProduct);
    });

    test('ProductService create DB ERROR', async () => {
        const fakeProduct = createMockProduct();
        const error = new Error('Error');

        repo.create.mockRejectedValue(error);

        await expect(service.create(fakeProduct)).rejects.toThrow('Error');
    
        expect(repo.create).toHaveBeenCalledWith(fakeProduct);
        expect(repo.create).toHaveBeenCalledTimes(1);
    });

    test('ProductService patch 200', async () => {
        const fakeId = createMockId();
        const fakeProduct = createMockProduct();

        repo.patch.mockResolvedValue(fakeProduct);

        const result = await service.patch(fakeId, fakeProduct);

        expect(repo.patch).toHaveBeenCalledWith(fakeId, fakeProduct);
        expect(result).toEqual(fakeProduct);
    });

    test('ProductService patch DB ERROR', async () => {
        const error = new Error('Error');
        const fakeProduct = createMockProduct();
        const fakeId = createMockId();

        repo.patch.mockRejectedValue(error);

        await expect(service.patch(fakeId, fakeProduct)).rejects.toThrow('Error');

        expect(repo.patch).toHaveBeenCalledWith(fakeId, fakeProduct);
    });

    test('ProductService patch erro ao atualizar', async () => {
        const fakeId = createMockId();
        const fakeProduct = createMockProduct();

        repo.patch.mockResolvedValue(null);

        await expect(service.patch(fakeId, fakeProduct)).rejects.toThrow('Erro ao atualizar produto');

        expect(repo.patch).toHaveBeenCalledWith(fakeId, fakeProduct);
    });

    test('ProductService delete 200', async () => {
        const fakeId = createMockId();
        const fakeProduct = createMockProduct();

        repo.delete.mockResolvedValue(fakeProduct);

        await service.delete(fakeId);

        expect(repo.delete).toHaveBeenCalledWith(fakeId);
    });

    test('ProductService delete DB ERROR', async () => {
        const fakeId = createMockId();
        const error = new Error('Error');

        repo.delete.mockRejectedValue(error);

        await expect(service.delete(fakeId)).rejects.toThrow('Error');

        expect(repo.delete).toHaveBeenCalledWith(fakeId);
    });

    test('ProductService delete erro ao deletar', async () => {
        const fakeId = createMockId();

        repo.delete.mockResolvedValue(null);

        await expect(service.delete(fakeId)).rejects.toThrow('Erro ao deletar produto');

        expect(repo.delete).toHaveBeenCalledWith(fakeId);
    })
})