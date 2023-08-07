"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_merge_1 = __importDefault(require("lodash.merge"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const stage = process.env.NODE_ENV;
console.log(stage);
let config;
if (stage === "production") {
    config = require("./prod").default;
    console.log(config);
}
else if (stage === "development") {
    config = require("./dev").default;
    console.log(config);
}
else {
    config = null;
}
const mergge = (0, lodash_merge_1.default)({
    stage
}, config);
console.log('merge', mergge);
exports.default = (0, lodash_merge_1.default)({
    stage
}, config);
