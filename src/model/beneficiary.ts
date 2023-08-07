import { DataTypes, Model } from "sequelize";
import { db } from "../config";
import User from "./user";


export enum BeneficiaryType {
    INDIVIDUAL = "Individual",
    COMPANY = "Company",
}

export interface BeneficiaryDetails {
    id: string;
    userId: string;
    beneficiaryName: string;
    accountNumber: string;
    beneficiaryType: BeneficiaryType;
}

class Beneficiary extends Model<BeneficiaryDetails> {
    public static associate(models: { User: typeof User}): void {
        Beneficiary.belongsTo(models.User, { foreignKey: "userId", as: "User"})
    }
}

Beneficiary.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: "id",
            },
        },
        beneficiaryName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        accountNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        beneficiaryType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
    },
    {
      sequelize: db,
      tableName: "Beneficiary",
      modelName: "Beneficiary",
    }
  );
  
  export default Beneficiary;
