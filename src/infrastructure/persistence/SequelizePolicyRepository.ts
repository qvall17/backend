import { IPolicyRepository } from "../../domain/repository/IPolicyRepository";
import { Policy } from "../../domain/entity/Policy";
import { PolicyModel } from "./model/PolicyModel";
import policies from "../../../seed/policies";

export class SequelizePolicyRepository implements IPolicyRepository {

    async findById(id: string): Promise<Policy> {
        const policyModel = await PolicyModel.findByPk(id);
        if (!policyModel) return null;
        return this.transformModelToEntity(policyModel);
    }

    async findByClientId(clientId: string): Promise<Policy[]> {
        const policyModels = await PolicyModel.findAll({
            where: { clientId }
        });
        if (!policies) return null;
        return policyModels.map(this.transformModelToEntity);
    }

    async createPolicy(newPolicy: Policy): Promise<Policy> {
        const policyModel = new PolicyModel({
            id: newPolicy.id,
            email: newPolicy.email,
            amountInsured: newPolicy.amountInsured,
            inceptionDate: newPolicy.inceptionDate,
            clientId: newPolicy.clientId,
            installmentPayment: newPolicy.installmentPayment
        });
        await policyModel.save();
        return this.transformModelToEntity(policyModel);
    }

    private transformModelToEntity(model: PolicyModel): Policy {
        return {
            id: model.id,
            email: model.email,
            amountInsured: model.amountInsured,
            inceptionDate: model.inceptionDate,
            installmentPayment: model.installmentPayment,
            clientId: model.clientId,
        };
    }
}
