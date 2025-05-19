import { CreateUserAddressDTO, PatchUserAddressDTO } from "../../models/userAddress.js";
import { IUserAddress } from "../../models/userAddress.js";
import { IUserAddressRepository } from "../repository/interfaces/userAddressRepoInterface.js";
import { IUserAddressService } from "./interfaces/userAddressService.js";

export class UserAddressService implements IUserAddressService {
    constructor(private repository: IUserAddressRepository) {}
    
    async findAll(id: string): Promise<IUserAddress[]> {
        return await this.repository.findAll(id);
    }
    
    async create(data: CreateUserAddressDTO): Promise<IUserAddress> {
        return await this.repository.create(data);
    }

    async patch(id: string, data: PatchUserAddressDTO): Promise<IUserAddress> {
        const find = await this.repository.findAll(data.userID);
        if (find.length === 0) throw new Error('Error');
        
        const address = await this.repository.patch(id, data);
        if (!address) throw new Error('Endereço não encontrado');

        return address;
    }

    async delete(id: string, addressId: string): Promise<IUserAddress> {
        const find = await this.repository.findAll(id);
        if (find.length === 0) throw new Error('Error');
        
        const address = await this.repository.delete(addressId);
        if (!address) throw new Error('Endereço não encontrado');

        return address;
    }
}
