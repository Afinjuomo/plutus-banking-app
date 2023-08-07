"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../config");
const user_1 = __importDefault(require("./user"));
var Duration;
(function (Duration) {
    Duration["THREE_MONTH"] = "3 Month";
    Duration["SIX_MONTH"] = "6 Month";
    Duration["TWELVE_MONTH"] = "12 Month";
})(Duration || (Duration = {}));
// class Investment extends Model<INVESTMENT>{
//     public static associate() {
//         Investment.belongsTo(User, {foreignKey:'userId', as:'User'})
//     }
// }
class Investment extends sequelize_1.Model {
    static associate(models) {
        Investment.belongsTo(models.User, { foreignKey: "userId", as: "User" });
    }
    ;
}
Investment.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: user_1.default,
            key: "id"
        }
    },
    companyName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    investedCapital: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    rateOfReturn: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    profit: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    duration: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    sequelize: config_1.db,
    tableName: "Investment",
    modelName: "Investment"
});
exports.default = Investment;
