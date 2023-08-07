import express from 'express';
import { transferToBeneficiary} from "../controllers/transfer";
import { auth } from '../middleware/auth';
const router = express.Router();

router.post('/', auth, transferToBeneficiary);



export default router


