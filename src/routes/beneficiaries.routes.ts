import express from 'express';
import { createBeneficiaries, deleteBeneficiary, getBeneficiaries } from "../controllers/beneficiary";

const router = express.Router();

router.get('/:id', getBeneficiaries);
router.post('/create', createBeneficiaries);
router.delete('/:id', deleteBeneficiary);



export default router
