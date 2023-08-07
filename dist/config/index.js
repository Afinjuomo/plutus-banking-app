"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const dbConfig_1 = __importDefault(require("./dbConfig"));
dotenv_1.default.config();
const { DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD } = dbConfig_1.default;
exports.db = new sequelize_1.Sequelize(DB_NAME, //name of database
DB_USERNAME, //name of username
DB_PASSWORD, //db password
{
    host: DB_HOST,
    port: 5432,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
        encrypt: true,
        // ssl: {
        //   rejectUnauthorized: false,
        // },
    },
});
