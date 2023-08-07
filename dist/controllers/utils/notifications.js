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
exports.emailHtml = exports.sendmail = exports.OTP_CONFIG = exports.OTP_LENGTH = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.DEV_GMAIL_USER,
        pass: process.env.DEV_GMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});
//  otp details
exports.OTP_LENGTH = 4;
exports.OTP_CONFIG = { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false };
const sendmail = (from, to, subject, html) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reponse = yield exports.transporter.sendMail({
            from: process.env.DEV_GMAIL_USER,
            to,
            subject: "Welcome",
            html,
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.sendmail = sendmail;
const emailHtml = (email, OTP) => {
    const mail = `<h1>Welcome to Plutus<h1>
                    <p>You username: ${email}</p><br>
                    <p>Your OTP: ${OTP}</p><br>
                    <p>Thank You</p>`;
    return mail;
};
exports.emailHtml = emailHtml;
