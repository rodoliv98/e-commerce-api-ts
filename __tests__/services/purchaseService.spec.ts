import { checkIfProductExist } from "../../src/utils/checkIfProductExist"
import { getCartTotal } from "../../src/utils/getCartTotal"
import { reduceQuantityInDatabase } from "../../src/utils/reduceQuantity"
import { PurchaseService } from "../../src/service/purchaseService"
import { IPurchaseRepository } from "../../src/repository/interfaces/purchaseRepoInterface"
import { CreatePurchaseDTO, IPurchase } from "../../models/purchase"

jest.mock("../../src/utils/checkIfProductExist");
jest.mock("../../src/utils/getCartTotal");
jest.mock("../../src/utils/reduceQuantity");

// funcs mockadas dessa forma porque elas são implementações reais da func
const mockedCheckIfProduct = checkIfProductExist as 
jest.MockedFunction<typeof checkIfProductExist>;

const mockedGetCartTotal = getCartTotal as 
jest.MockedFunction<typeof getCartTotal>;

const mockedReduceQuantity = reduceQuantityInDatabase as 
jest.MockedFunction<typeof reduceQuantityInDatabase>;

describe('Purchase service - payment method', () => {
    // serivce pode ser instanciado de forma direta pq é ele mesmo que queremos testar
    let service: PurchaseService;
    // criando mock e fazendo a tipagem do repo. é feito dessa forma porque é uma interface e não a implementação real
    let mockedRepo: jest.Mocked<IPurchaseRepository>;

    beforeEach(() => {
        // garante o reset de todos os mocks
        jest.resetAllMocks();
        // criando o objeto com as propriedades da interface
        mockedRepo = {
            payment: jest.fn(),
            get: jest.fn()
        };

        service = new PurchaseService(mockedRepo);
    });

    function createMockedData (overrides = {}): Partial<CreatePurchaseDTO> {
        return {
            cart: [
                { productId: '1', quantity: 2, price: 1, item: 'lol' },
                { productId: '1', quantity: 2, price: 1, item: 'lul' },
            ],
            total: 100,
            ...overrides
        }
    }

    function createMockedResult (overrides = {}): Partial<IPurchase> {
        return {
            fullName: 'rodrigo',
            total: 100,
            ...overrides
        }
    }

    test('Purchase 200 OK', async () => {
        // utilização de helper funcs
        const fakeResult = createMockedResult();
        const fakeData = createMockedData();
        
        // retorna o fake result
        mockedRepo.payment.mockResolvedValue(fakeResult as IPurchase);
        
        // roda o método da classe com os dados fakes 
        await service.payment(fakeData as CreatePurchaseDTO);

        // o esperado
        expect(mockedCheckIfProduct).toHaveBeenCalledWith(fakeData);
        expect(mockedGetCartTotal).toHaveBeenCalledWith(fakeData.cart, fakeData.total);
        expect(mockedReduceQuantity).toHaveBeenCalledWith(fakeData.cart);
        expect(mockedRepo.payment).toHaveBeenCalledWith(fakeData);
    });

    test('Repo throws error', async () => {
        // helper func
        const fakeData = createMockedData();
        
        // mensagem de erro
        const error = new Error('Erro no banco de dados');
        mockedRepo.payment.mockRejectedValue(error);

        // Sem o expect aqui temos um uncaught error 
        await expect(service.payment(fakeData as CreatePurchaseDTO)).rejects.toThrow('Erro no banco de dados');

        expect(mockedCheckIfProduct).toHaveBeenCalledWith(fakeData);
        expect(mockedGetCartTotal).toHaveBeenCalledWith(fakeData.cart, fakeData.total);
        expect(mockedRepo.payment).toHaveBeenCalledWith(fakeData);
        
        expect(mockedReduceQuantity).not.toHaveBeenCalledWith(fakeData.cart);
    });

    test('checkIfProductExist throws error', async () => {
        const fakeData = createMockedData();
        
        // lança erro pq nao achou produto
        mockedCheckIfProduct.mockRejectedValue(new Error('Product not found'));

        // espera a captura do erro
        await expect(service.payment(fakeData as CreatePurchaseDTO)).rejects.toThrow('Product not found');

        expect(mockedGetCartTotal).not.toHaveBeenCalled();
        expect(mockedReduceQuantity).not.toHaveBeenCalled();
        expect(mockedRepo.payment).not.toHaveBeenCalled();
    });

    test('getCartTotal throws error', async () => {
        const fakeData = createMockedData();

        mockedGetCartTotal.mockImplementation(() => { throw new Error('Wrong total value') });
    
        await expect(service.payment(fakeData as CreatePurchaseDTO)).rejects.toThrow('Wrong total value');

        expect(mockedCheckIfProduct).toHaveBeenCalledWith(fakeData);
        expect(mockedReduceQuantity).not.toHaveBeenCalled();
        expect(mockedRepo.payment).not.toHaveBeenCalled();
    });

    test('reduceQuantity throws error', async () => {
        const fakeData = createMockedData();

        mockedReduceQuantity.mockRejectedValue(new Error('Error'));

        await expect(service.payment(fakeData as CreatePurchaseDTO)).rejects.toThrow('Error');

        expect(mockedCheckIfProduct).toHaveBeenCalledWith(fakeData);
        expect(mockedGetCartTotal).toHaveBeenCalledWith(fakeData.cart, fakeData.total);
        expect(mockedRepo.payment).toHaveBeenCalledWith(fakeData);
    });
})