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
exports.transferToBeneficiary = void 0;
const user_1 = __importDefault(require("../model/user"));
const transfer_1 = __importDefault(require("../model/transfer"));
const uuid_1 = require("uuid");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transferToBeneficiary = (req, res, NextFunction) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const token_info = token.split(" ")[1];
        const decodedToken = jsonwebtoken_1.default.verify(token_info, process.env.APP_SECRET);
        const { accountNumber, amount, transfer_purpose, beneficiary_name, beneficiary_email, payer_reference, information_for_beneficiary, } = req.body;
        const validated_Beneficiary = yield user_1.default.findOne({
            where: { accountNumber },
        });
        if (decodedToken.email) {
            if (validated_Beneficiary) {
                const beneficiary_AccountNumber = validated_Beneficiary.accountNumber;
                const sender_id = decodedToken.id;
                const sender_accountDetails = yield user_1.default.findOne({
                    where: { id: sender_id },
                });
                const sender_AccountBalance = sender_accountDetails.accountBalance;
                const sender_accountNumber = sender_accountDetails.accountNumber;
                if (+sender_accountNumber !== +beneficiary_AccountNumber &&
                    +beneficiary_AccountNumber === +accountNumber) {
                    if (sender_AccountBalance >= +amount) {
                        const transfer = yield transfer_1.default.create({
                            id: (0, uuid_1.v4)(),
                            accountNumber,
                            amount,
                            transfer_purpose,
                            beneficiary_name,
                            beneficiary_email,
                            payer_reference,
                            information_for_beneficiary,
                        });
                        if (transfer) {
                            const beneficiary_old_Account_Balance = validated_Beneficiary.accountBalance;
                            const beneficiary_new_AccountBalance = parseInt(amount) + beneficiary_old_Account_Balance;
                            const fulfilled_transaction = yield user_1.default.update({ accountBalance: beneficiary_new_AccountBalance }, {
                                where: {
                                    accountNumber: beneficiary_AccountNumber,
                                },
                            });
                            const sender_old_Account_Balance = sender_AccountBalance;
                            const sender_new_Account_Balance = +sender_old_Account_Balance - +amount;
                            yield user_1.default.update({ accountBalance: sender_new_Account_Balance }, {
                                where: {
                                    accountNumber: sender_accountNumber,
                                },
                            });
                            if (fulfilled_transaction) {
                                return res.status(200).json({
                                    message: "Transaction Successful",
                                });
                            }
                            else {
                                return res.status(400).json({
                                    message: "Transaction Failed",
                                });
                            }
                        }
                    }
                    else {
                        return res.status(400).json({
                            message: "Insufficient Funds",
                        });
                    }
                }
                else {
                    return res.status(400).json({
                        message: "Cannot make TRANSFER. Please check details properly.",
                    });
                }
            }
            else {
                return res.status(400).json({
                    message: "Beneficiary Account Number is not found",
                });
            }
        }
        else {
            return res.status(400).json({
                message: "You must be LOGGED IN to make a transfer",
            });
            // Beneficiary Account Number Not found
        }
    }
    catch (error) {
        console.error(error);
    }
});
exports.transferToBeneficiary = transferToBeneficiary;
