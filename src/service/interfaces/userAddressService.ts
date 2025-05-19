import { IUserAddress } from "../../../models/userAddress.js";
import { CreateUserAddressDTO, PatchUserAddressDTO } from "../../../models/userAddress.js";

export interface IUserAddressService {
    findAll(id: string): Promise<IUserAddress[]>;
    create(data: CreateUserAddressDTO): Promise<IUserAddress>;
    patch(id: string, data: PatchUserAddressDTO): Promise<IUserAddress>;
    delete(id: string, addressId: string): Promise<IUserAddress>;
}
