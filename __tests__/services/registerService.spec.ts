import { RegisterService } from "../../src/service/registerService"
import { IUserRepository } from "../../src/repository/interfaces/userRepoInterface"
import { sendVerificationEmail } from "../../nodeMailer/emailService"
import { createToken } from "../../src/utils/createToken"
import { CreateUserDTO, IUser } from "../../models/user"
import mongoose from "mongoose"

jest.mock("../../nodeMailer/emailService");
jest.mock("../../src/utils/createToken");

const mockedSendVerificationEmail = sendVerificationEmail as
jest.MockedFunction<typeof sendVerificationEmail>;

const mockedCreateToken = createToken as
jest.MockedFunction<typeof createToken>

describe('RegisterService', () => {
    let service: RegisterService;
    let repo: jest.Mocked<IUserRepository>;

    beforeEach(() => {
        jest.resetAllMocks()
        
        repo = {
            login: jest.fn(),
            refresh: jest.fn(),
            create: jest.fn(),
            verify: jest.fn(),
            showUser: jest.fn(),
            recoverPassword: jest.fn(),
            updatePassword: jest.fn(),
        }

        service = new RegisterService(repo);
    });

    function createFakeData (overrides = {}): CreateUserDTO {
        return {
            email: 'rodrigo@email.com',
            password: 'oijsdafio',
            ...overrides
        } as CreateUserDTO
    }

    function createFakeUser (overrides = {}): IUser {
        return {
            _id: new mongoose.Types.ObjectId('123123123123123123123123'),
            email: 'rodrigo@email.com',
            ...overrides
        } as IUser
    }

    function createFakeToken () {
        return 'ofdshofiuhwif13214214iifq'
    }

    test('RegisterService create 200', async () => {
        const data = createFakeData();
        const fakeUser = createFakeUser();
        const token = createFakeToken();

        repo.create.mockResolvedValue(fakeUser);
        mockedCreateToken.mockReturnValue(token);

        await service.create(data);

        expect(repo.create).toHaveBeenCalledWith(data);
        expect(mockedCreateToken).toHaveBeenCalledWith(fakeUser._id.toString());
        expect(mockedSendVerificationEmail).toHaveBeenCalledWith(fakeUser.email, token);
    });

    test('RegisterService create sendEmail error', async () => {
        const data = createFakeData();
        const user = createFakeUser();
        const token = createFakeToken();

        repo.create.mockResolvedValue(user);
        mockedCreateToken.mockReturnValue(token);
        mockedSendVerificationEmail.mockRejectedValue(new Error('Erro'));

        await expect(service.create(data)).rejects.toThrow('Erro');
        
        expect(repo.create).toHaveBeenCalledWith(data);
        expect(mockedCreateToken).toHaveBeenCalledWith(user._id.toString());
        expect(mockedSendVerificationEmail).toHaveBeenCalledWith(user.email, token);
    })
})