import { UserAddressService } from "../../src/service/userAddressService"
import { IUserAddressRepository, IUserAddress } from "../../src/repository/interfaces/userAddressRepoInterface"

describe('UserAddress Service', () => {
    let service: UserAddressService;
    let repo: jest.Mocked<IUserAddressRepository>;

    beforeEach(() => {
        jest.resetAllMocks();

        repo = {
            create: jest.fn(),
            delete: jest.fn(),
            findAll: jest.fn(),
            patch: jest.fn()
        }

        service = new UserAddressService(repo);
    });

    function createMockId () {
        return '123123123123123';
    }

    function createMockUserAddresses (overrides = {}): IUserAddress {
        return {
            country: 'brasil',
            state: 'rio',
            ...overrides
        } as IUserAddress
    }

    test('UserAddress findAll 200', async () => {
        const fakeId = createMockId();
        const fakeAddresses = createMockUserAddresses();

        repo.findAll.mockResolvedValue([fakeAddresses]);
        const result = await service.findAll(fakeId);

        expect(repo.findAll).toHaveBeenCalledWith(fakeId);
        expect(result).toEqual([fakeAddresses]);
        expect(repo.findAll).toHaveBeenCalledTimes(1);
    });

    test('UserAddress findAll empty array', async () => {
        const fakeId = createMockId();

        repo.findAll.mockResolvedValue([]);
        const result = await service.findAll(fakeId);

        expect(repo.findAll).toHaveBeenCalledWith(fakeId);
        expect(repo.findAll).toHaveBeenCalledTimes(1);
        expect(result).toEqual([]);
    })

    test('UserAddress findAll DB ERROR', async () => {
        const error = new Error('error');
        const fakeId = createMockId();

        repo.findAll.mockRejectedValue(error);
        await expect(service.findAll(fakeId)).rejects.toThrow('error');

        expect(repo.findAll).toHaveBeenCalledWith(fakeId);
        expect(repo.findAll).toHaveBeenCalledTimes(1);
    });
})