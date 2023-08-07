"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { DEV_PORT, DEV_DB_NAME, DEV_DB_HOST, DEV_DB_USERNAME, DEV_DB_PASSWORD } = process.env;
exports.default = {
    PORT: DEV_PORT,
    DB_NAME: DEV_DB_NAME,
    DB_HOST: DEV_DB_HOST,
    DB_USERNAME: DEV_DB_USERNAME,
    DB_PASSWORD: DEV_DB_PASSWORD
};
console.log("running in dev mode");
