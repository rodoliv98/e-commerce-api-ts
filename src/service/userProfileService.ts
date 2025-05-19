import { IUserProfile } from "../../models/userProfile.js";
import { IUserRepository } from "../repository/interfaces/userRepoInterface.js";
import { CreateIUserProfileDTO, PatchIUserProfileDTO } from "../../models/userProfile.js";
import { IUserProfileRepository } from "../repository/interfaces/userProfileRepoInterface.js";
import { IUserProfileService } from "./interfaces/userProfileServiceInterface.js";

interface Repos {
    profile: IUserProfileRepository;
    user: IUserRepository;
}

export class UserProfileService implements IUserProfileService {
    constructor(private repos: Repos) {}
    
    async showUser(id: string): Promise<String[]> {
        const user = await this.repos.user.showUser(id);
        if(!user) throw new Error('Usuário não encontrado');

        const firstName = user.firstName;
        const email = user.email;

        return [firstName, email];
    }

    async showProfile(id: string): Promise<IUserProfile> {
        const profile = await this.repos.profile.showProfile(id);
        if(!profile) throw new Error('Perfil não encontrado');

        return profile;
    }

    async create(data: CreateIUserProfileDTO): Promise<IUserProfile> {
        return this.repos.profile.create(data);
    }

    async patch(data: PatchIUserProfileDTO): Promise<IUserProfile> {
        const profile = await this.repos.profile.patch(data);
        if(!profile) throw new Error('Perfil não encontrado');

        return profile;
    }
}