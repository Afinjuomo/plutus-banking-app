import {userSignup, loginUser, forgotPassword, createAdmin, verifyChangePasswordEmail, verifyChangePasswordOTP, verifyChangePassword, verifyUser, resendOTP} from '../controllers/controller'
import { Router} from 'express';
import {db} from '../config/index'
import { auth } from '../middleware/auth';

const router = Router();

router.post('/signup', userSignup);
router.put('/update', forgotPassword);
router.put('/resendotp/:token', resendOTP);
router.post('/login', loginUser);
router.post('/adminSignup', createAdmin)
router.put('/forgot-password', forgotPassword)
router.put('/verify-user',auth, verifyUser)
router.put('/change-password-email', verifyChangePasswordEmail)
router.put('/change-password-otp/:id', verifyChangePasswordOTP)
router.put('/change-password/:id', verifyChangePassword)


export default router