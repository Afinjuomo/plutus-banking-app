"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteBeneficiary = exports.createBeneficiaries = exports.getBeneficiaries = void 0;
const beneficiary_1 = __importStar(require("../model/beneficiary"));
const user_1 = __importDefault(require("../model/user"));
const uuid_1 = require("uuid");
const getBeneficiaries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        console.log('Fetching beneficiaries for id:', id); // Add this line
        const beneficiaries = yield beneficiary_1.default.findAll({ where: { id: id } });
        res.status(200).json(beneficiaries);
    }
    catch (error) {
        console.error('Error fetching beneficiaries:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getBeneficiaries = getBeneficiaries;
const createBeneficiaries = (req, res, NextFunction) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, beneficiaryName, accountNumber, beneficiaryType } = req.body;
        // Generate UUID for the beneficiary id
        const id = (0, uuid_1.v4)();
        // Query for the user based on userId (not accountNumber)
        const user = yield user_1.default.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({
                error: "User not found",
            });
        }
        const mappedBeneficiaryType = beneficiaryType === "Individual"
            ? beneficiary_1.BeneficiaryType.INDIVIDUAL
            : beneficiary_1.BeneficiaryType.COMPANY;
        const newBeneficiary = yield beneficiary_1.default.create({
            id,
            userId: user_1.default.id,
            beneficiaryName,
            accountNumber,
            beneficiaryType: mappedBeneficiaryType,
        });
        res.status(200).json({
            message: "Beneficiary created successfully",
            newBeneficiary,
        });
    }
    catch (error) {
        console.error("Error creating beneficiary", error);
        res.status(500).json({
            error: "Internal server error",
        });
    }
});
exports.createBeneficiaries = createBeneficiaries;
const deleteBeneficiary = (req, res, NextFunction) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const deleteId = yield beneficiary_1.default.destroy({
            where: { id: id },
        });
        if (deleteId > 0) {
            res.status(200).json({
                message: "Beneficiary deleted successfully"
            });
        }
        else {
            res.status(404).json({
                error: "Beneficiary not found"
            });
        }
    }
    catch (error) {
        console.error('Error deleting Beneficiary', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});
exports.deleteBeneficiary = deleteBeneficiary;
