import { CreateIUserProfileDTO, PatchIUserProfileDTO } from "../../../models/userProfile";
import { IUserProfile } from "../../../models/userProfile";

export interface IUserProfileRepository {
    showProfile(id: string): Promise<IUserProfile | null>;
    create(data: CreateIUserProfileDTO): Promise<IUserProfile>;
    patch(data: PatchIUserProfileDTO): Promise<IUserProfile | null>;
}