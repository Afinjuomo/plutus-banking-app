"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../config");
// class User extends Model<IUSER>{
//     public static associate(models:INVESTMENT) {
//         User.hasMany(Investment, {foreignKey:'userId', as:'Investment'} )
//     }
// }
class User extends sequelize_1.Model {
    static associate(models) {
        User.hasMany(models.Investment, { foreignKey: "userId", as: "Investment" });
    }
    ;
}
User.init({
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
    savingsWallet: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    otp: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    token: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    imageUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    notification: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    accountBalance: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    verify: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true
    }
}, {
    sequelize: config_1.db,
    tableName: "User",
    modelName: "User"
});
exports.default = User;
