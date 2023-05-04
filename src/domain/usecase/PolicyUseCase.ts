import { IPolicyRepository } from "../repository/IPolicyRepository";
import { Policy } from "../entity/Policy";
import { IUserRepository } from "../repository/IUserRepository";
import { User } from "../entity/User";
import { RestError } from "../../utils/error";

export class PolicyUseCase {
    constructor(private readonly policyRepository: IPolicyRepository, private readonly userRepository: IUserRepository) {}

    /**
     * Gets all policies by username
     * @param username
     */
    async findByUsername(username: string): Promise<Policy[]> {
        const user: User = await this.userRepository.findByUsername(username);
        if (user) return this.policyRepository.findByClientId(user.id);
        else throw new RestError("User not found", 404);
    }

    async findUserById(id: string): Promise<User> {
        const policy: Policy = await this.policyRepository.findById(id);
        if (policy) return this.userRepository.findById(policy.clientId);
        else throw new RestError("Policy not found", 404);
    }

    async seed(): Promise<void> {
        return this.policyRepository.seed();
    }

}
