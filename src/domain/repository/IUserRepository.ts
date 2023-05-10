import { User } from "../entity/User";

export interface IUserRepository {
    findById(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findByName(name: string): Promise<User>;
    changePassword(id: string, newPassword: string): Promise<void>;
    matchPasswordForUser(user: User, plainPassword: string): Promise<boolean>;
    seed(): void;
}
