import { Policy } from "../entity/Policy";

export interface IPolicyRepository {
    findById(id: string): Promise<Policy>;
    findByClientId(clientId: string): Promise<Policy[]>;
    seed(): void;
}
