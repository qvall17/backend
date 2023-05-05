import { User } from "../entity/User";

export interface IUserRepository {
    /**
     * Find user by id
     * @param id
     */
    findById(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findByUsername(username: string): Promise<User>;

    /**
     * Change password to user
     * @param email
     * @param newPassword
     */
    changePassword(email: string, newPassword: string): Promise<void>;

    /**
     * Check if a password matches for the email
     * @param user
     * @param plainPassword
     */
    matchPasswordForUser(user: User, plainPassword: string): Promise<boolean>;

    seed(): Promise<void>;

}
