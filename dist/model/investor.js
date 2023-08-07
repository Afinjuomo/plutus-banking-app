"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../config");
const company_1 = __importDefault(require("./company"));
class Investor extends sequelize_1.Model {
    static associate(models) {
        Investor.belongsTo(models.Company, { foreignKey: 'companyId', as: 'Company' });
    }
}
Investor.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    accountNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    investedCapital: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true
    },
    expectedReturn: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true
    },
    monthlyReturn: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true
    },
    active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    companyId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: company_1.default,
            key: "id"
        }
    }
}, {
    sequelize: config_1.db,
    tableName: "Investor",
    modelName: "Investor"
});
exports.default = Investor;
