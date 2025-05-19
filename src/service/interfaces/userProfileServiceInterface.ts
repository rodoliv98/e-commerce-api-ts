import { IUserProfile } from "../../../models/userProfile.js";
import { CreateIUserProfileDTO, PatchIUserProfileDTO } from "../../../models/userProfile.js";

export interface IUserProfileService {
    showUser(id: string): Promise<String[]>;
    showProfile(id: string): Promise<IUserProfile>;
    create(data: CreateIUserProfileDTO): Promise<IUserProfile>;
    patch(data: PatchIUserProfileDTO): Promise<IUserProfile>;
}