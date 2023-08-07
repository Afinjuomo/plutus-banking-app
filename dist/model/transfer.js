"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../config");
class Transfers extends sequelize_1.Model {
}
Transfers.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    accountNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    transfer_purpose: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true
    },
    beneficiary_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    beneficiary_email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    payer_reference: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    information_for_beneficiary: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: config_1.db,
    tableName: "Transfers",
    // modelName:"Transfers"
});
exports.default = Transfers;
