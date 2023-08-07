"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.verifyToken = exports.tokenGenerator = exports.generateOTP = exports.genAccount = exports.hashedPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const otp_generator_1 = __importDefault(require("otp-generator"));
const notifications_1 = require("./notifications");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const hashedPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10;
    return yield bcrypt_1.default.hash(password, saltRounds);
});
exports.hashedPassword = hashedPassword;
const genAccount = () => {
    const prefix = '015';
    const num = Math.floor(10000000 + Math.random() * 9000);
    const account = `${prefix + num}`;
    return account;
};
exports.genAccount = genAccount;
const generateOTP = () => {
    const OTP = otp_generator_1.default.generate(notifications_1.OTP_LENGTH, notifications_1.OTP_CONFIG);
    return OTP;
};
exports.generateOTP = generateOTP;
const tokenGenerator = (data) => {
    const token = jsonwebtoken_1.default.sign(data, process.env.APP_SECRET);
    return token;
};
exports.tokenGenerator = tokenGenerator;
const verifyToken = (token) => {
    const decoded = jsonwebtoken_1.default.verify(token, "onGod");
    return decoded;
};
exports.verifyToken = verifyToken;
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        throw new Error('No token provided');
    }
    const decodedToken = jsonwebtoken_1.default.verify(token, "onGod");
    ;
    if (decodedToken.role !== 'admin') {
        throw new Error('You are not admin');
    }
    else {
        next();
    }
});
exports.isAdmin = isAdmin;
