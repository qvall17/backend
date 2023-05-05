import { IUserRepository } from "../repository/IUserRepository";
import { User } from "../entity/User";

export class UserUseCase {
    constructor(private readonly userRepository: IUserRepository) {}

    /**
     * Find by id
     * @param id
     */
    async findById(id: string): Promise<User> {
        return this.userRepository.findById(id);
    }

    /**
     * Find by email
     * @param email
     */
    async findByEmail(email: string): Promise<User> {
        return this.userRepository.findByEmail(email);
    }

    /**
     * Checks if a user match its password
     * @param email
     * @param plainPassword
     */
    async checkUserMatchPassword(email: string, plainPassword: string): Promise<boolean> {
        const user: User = await this.userRepository.findByEmail(email);
        return this.userRepository.matchPasswordForUser(user, plainPassword);
    }

    /**
     * Find by username
     * @param username
     */
    async findByUsername(username: string): Promise<User> {
        return this.userRepository.findByUsername(username);
    }

    /**
     * Change password to user
     * @param email
     * @param newPassword
     */
    async changePassword(email: string, newPassword: string): Promise<void> {
        return this.userRepository.changePassword(email, newPassword);
    }
    /**
     * SEED
     */
    async seed(): Promise<void> {
        return this.userRepository.seed();
    }

}
