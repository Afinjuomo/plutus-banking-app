import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import otpGenerator from "otp-generator";
import { OTP_LENGTH, OTP_CONFIG } from "./notifications";
import dotenv  from "dotenv";
dotenv.config()






export const hashedPassword = async (password: string) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};


export const genAccount = () => {
  const prefix = '015';
    const num = Math.floor(10000000 + Math.random() * 9000);
  const account = `${prefix + num}`
  return account;
}
 
export const generateOTP = () => {
  const OTP = otpGenerator.generate(OTP_LENGTH, OTP_CONFIG);
  return OTP;
}

export const tokenGenerator = (data:any)=>{
  const token = jwt.sign(data, process.env.APP_SECRET!)
  return token
}

export const verifyToken = (token:any)=>{
   const decoded = jwt.verify(token, "onGod")
   return decoded
}

export const isAdmin = async (req: Request, res: Response, next: NextFunction) =>{
  const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new Error('No token provided');
    }
  const decodedToken = jwt.verify(token, "onGod") as JwtPayload;;
  
  if(decodedToken.role !== 'admin'){
      throw new Error('You are not admin')
  }else{
      next();
  }
};


