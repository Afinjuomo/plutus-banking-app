"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../config");
const investor_1 = __importDefault(require("./investor"));
var Duration;
(function (Duration) {
    Duration["THREE_MONTH"] = "3 Month";
    Duration["SIX_MONTH"] = "6 Month";
    Duration["TWELVE_MONTH"] = "12 Month";
})(Duration || (Duration = {}));
var BusinessType;
(function (BusinessType) {
    BusinessType["AGRICULTURE"] = "Agriculture";
    BusinessType["MANUFACTURING"] = "Manufacturing";
    BusinessType["MINING"] = "Mining";
    BusinessType["TRANSPORTATION"] = "Transportation";
    BusinessType["CONSTRUCTION"] = "Construction";
    BusinessType["FINANCE"] = "Finance";
    BusinessType["REAL_ESTATE"] = "Real Estate";
    BusinessType["EDUCATION"] = "Education";
    BusinessType["HEALTH_CARE"] = "Health Care";
    BusinessType["INFORMATION_TECHNOLOGY"] = "Information Technology";
    BusinessType["COMMUNICATION"] = "Communication";
    BusinessType["ENTERTAINMENT"] = "Entertainment";
    BusinessType["HOSPITALITY"] = "Hospitality";
    BusinessType["RETAIL"] = "Retail";
    BusinessType["OTHERS"] = "Others";
})(BusinessType || (BusinessType = {}));
class Company extends sequelize_1.Model {
    static associate() {
        Company.hasMany(investor_1.default, { foreignKey: "companyId", as: "Investor" });
    }
    ;
}
Company.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    companyName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    rateOfReturn: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    duration: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(Duration)),
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    verified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    businessType: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(BusinessType)),
        allowNull: false
    }
}, {
    sequelize: config_1.db,
    tableName: "Company"
});
exports.default = Company;
