import { LoginDTO } from "../loginService.js";

export interface ILoginService {
    login(data: LoginDTO): Promise<string[]>;
    refresh(refreshToken: string): Promise<string[]>;
}