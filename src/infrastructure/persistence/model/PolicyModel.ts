import { AutoIncrement, Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";

@Table({
    tableName: "policy",
})
export class PolicyModel extends Model<PolicyModel> {
    @PrimaryKey
    @AutoIncrement
    @Column
    public id: string;

    @Column
    public amountInsured: number;

    @Column
    public email: string;

    @Column
    public inceptionDate: string;

    @Column
    public clientId: string;

    @Column
    public installmentPayment: boolean;

    @CreatedAt
    @Column
    public created_at: Date;

    @UpdatedAt
    @Column
    public updated_at: Date;
}
