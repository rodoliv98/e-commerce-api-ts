import { CreateUserAddressDTO, PatchUserAddressDTO } from "../../models/userAddress.js";
import { IUserAddress } from "../../models/userAddress.js";
import { UserAddress } from "../../models/userAddress.js";
import { IUserAddressRepository } from "./interfaces/userAddressRepoInterface.js";

export class UserAddressRepository implements IUserAddressRepository {
    async findAll(id: string): Promise<IUserAddress[]> {
        return UserAddress.find({ userID: id });
    }
    
    async create(data: CreateUserAddressDTO): Promise<IUserAddress> {
        return UserAddress.create(data);
    }

    async patch(id: string, data: PatchUserAddressDTO): Promise<IUserAddress | null> {
        return UserAddress.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(addressId: string): Promise<IUserAddress | null> {
        return UserAddress.findByIdAndDelete(addressId);
    }
}
