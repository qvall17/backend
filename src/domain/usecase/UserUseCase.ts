import { IUserRepository } from "../repository/IUserRepository";
import { User } from "../entity/User";
import { RestError } from "../../utils/error";
import clients from "../../../seed/clients";
import { HttpStatusCode } from "../../utils/HttpStatusCode";

export class UserUseCase {
    constructor(private readonly userRepository: IUserRepository) {}

    /**
     * Find by id
     * @param id
     */
    async findById(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) throw new RestError("User not found", HttpStatusCode.NOT_FOUND);
        return user;
    }

    /**
     * Find by email
     * @param email
     */
    async findByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findByEmail(email);
        if (user) return user;
        else throw new RestError("User not found", HttpStatusCode.NOT_FOUND);
    }

    /**
     * Checks if a user match its password
     * @param email
     * @param plainPassword
     */
    async checkUserMatchPassword(email: string, plainPassword: string): Promise<boolean> {
        const user = await this.userRepository.findByEmail(email);
        if (user) return this.userRepository.matchPasswordForUser(user, plainPassword);
        else throw new RestError("User not found", HttpStatusCode.NOT_FOUND);
    }

    /**
     * Find by name
     * @param name
     */
    async findByName(name: string): Promise<User> {
        const user = await this.userRepository.findByName(name);
        if (user) return user;
        else throw new RestError("User not found", HttpStatusCode.NOT_FOUND);
    }

    /**
     * Change password to user
     * @param id
     * @param newPassword
     */
    async changePassword(id: string, newPassword: string): Promise<void> {
        return this.userRepository.changePassword(id, newPassword);
    }
    /**
     * SEED
     */
    async seed(): Promise<void> {
        for (const client of clients as User[]) {
            await this.userRepository.createUser(client);
        }
    }

}
