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
     * Check user is admin
     * @param email
     */
    async isAdmin(email: string): Promise<boolean> {
        return this.userRepository.isAdmin(email);
    }

    /**
     * Check user email exists
     * @param email
     */
    async isValidUser(email: string): Promise<boolean> {
        return this.userRepository.isValidUser(email);
    }


    /**
     * Find by username
     * @param username
     */
    async findByUsername(username: string): Promise<User> {
        return this.userRepository.findByUsername(username);
    }
    /**
     * SEED
     */
    async seed(): Promise<void> {
        return this.userRepository.seed();
    }

}
