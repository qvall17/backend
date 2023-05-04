import { User } from "../entity/User";

export interface IUserRepository {
    /**
     * Find user by id
     * @param id
     */
    findById(id: string): Promise<User>;
    isAdmin(email: string): Promise<boolean>;
    isValidUser(email: string): Promise<boolean>;
    findByUsername(username: string): Promise<User>;
    seed(): Promise<void>;

}
