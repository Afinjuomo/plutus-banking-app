"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const beneficiary_1 = require("../controllers/beneficiary");
const router = express_1.default.Router();
router.get('/:id', beneficiary_1.getBeneficiaries);
router.post('/create', beneficiary_1.createBeneficiaries);
router.delete('/:id', beneficiary_1.deleteBeneficiary);
exports.default = router;
