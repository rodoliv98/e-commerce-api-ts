import { CreateUserAddressDTO, PatchUserAddressDTO, IUserAddress } from "../../../models/userAddress";

export interface IUserAddressRepository {
    findAll(id: string): Promise<IUserAddress[]>;
    create(data: CreateUserAddressDTO): Promise<IUserAddress>;
    patch(id: string, data: PatchUserAddressDTO): Promise<IUserAddress | null>;
    delete(addressId: string): Promise<IUserAddress | null>;
}