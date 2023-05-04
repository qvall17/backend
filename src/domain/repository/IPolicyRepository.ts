import { Policy } from "../entity/Policy";

export interface IPolicyRepository {
    /**
     * Find policy by id
     * @param id
     */
    findById(id: string): Promise<Policy>;

    findByClientId(clientId: string): Promise<Policy[]>;

    seed(): Promise<void>;

}
