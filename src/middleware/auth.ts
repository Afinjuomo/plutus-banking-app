import { NextFunction, Response } from "express"
import  jwt, { JwtPayload }  from "jsonwebtoken"
import dotenv from 'dotenv'
import User, { IUSER } from "../model/user"
dotenv.config()

export const auth = async(req:JwtPayload, res:Response, next:NextFunction) => {
    try{
        const authorization = req.headers.authorization

        if(!authorization){
            return res.status(401).json({
                message: "Kindly signin"
            })
        }

        const token = authorization.slice(7, authorization.length)
        let verified = jwt.verify(token, process.env.APP_SECRET!)

        if(!verified){
            return res.status(401).json({
                message: "unauthorised"
            })
        }

        const {id} = verified as {[key:string]:string}

        const user = await User.findOne({where:{id: id}})as unknown as IUSER;

        if(!user){
            return res.status(401).json({
                message: "Invalid Credentials"
            })
        }

        req.user = verified 
        next()
     
    }catch(err){
        return res.status(401).json({
            message: "unauthorised",
        })
    }
    
}

