import { IPolicyRepository } from "../repository/IPolicyRepository";
import { Policy } from "../entity/Policy";
import { IUserRepository } from "../repository/IUserRepository";
import { User } from "../entity/User";
import { RestError } from "../../utils/error";
import policies from "../../../seed/policies";
import { HttpStatusCode } from "../../utils/HttpStatusCode";

export class PolicyUseCase {
    constructor(private readonly policyRepository: IPolicyRepository, private readonly userRepository: IUserRepository) {}

    /**
     * Gets all policies by name
     * @param name
     */
    async findByName(name: string): Promise<Policy[]> {
        const user = await this.userRepository.findByName(name);
        if (user) return this.policyRepository.findByClientId(user.id);
        else throw new RestError("User not found", HttpStatusCode.NOT_FOUND);
    }

    async findUserById(id: string): Promise<User> {
        const policy = await this.policyRepository.findById(id);
        if (policy) return this.userRepository.findById(policy.clientId);
        else throw new RestError("Policy not found", HttpStatusCode.NOT_FOUND);
    }

    async seed(): Promise<void> {
        for (const policy of policies as Policy[]) {
            await this.policyRepository.createPolicy(policy);
        }
    }

}
