import { CreateIUserProfileDTO, PatchIUserProfileDTO } from "../../models/userProfile";
import { IUserProfile } from "../../models/userProfile";
import { UserProfile } from "../../models/userProfile";
import { IUserProfileRepository } from "./interfaces/userProfileRepoInterface";

export class UserProfileRepository implements IUserProfileRepository {
    async showProfile(id: string): Promise<IUserProfile | null> {
        return UserProfile.findOne({ userId: id }).lean().exec();
    }

    async create(data: CreateIUserProfileDTO): Promise<IUserProfile> {
        return UserProfile.create(data);
    }

    async patch(data: PatchIUserProfileDTO): Promise<IUserProfile | null> {
        return UserProfile.findOneAndUpdate({ userId: data.userId }, data, { new: true }).lean().exec();
    }
}
