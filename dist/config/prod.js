"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PROD_PORT, DB_NAME } = process.env;
exports.default = {
    PORT: PROD_PORT,
    DB_NAME: DB_NAME
};
console.log("running in productionx mode");
