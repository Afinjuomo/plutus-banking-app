import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config()

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.DEV_GMAIL_USER,
        pass: process.env.DEV_GMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
})
//  otp details

export const OTP_LENGTH = 4;
export const OTP_CONFIG = { lowerCaseAlphabets:false, upperCaseAlphabets: false, specialChars: false };


export type MAIL_PARAMS = {
    to: string,
    OTP: string
}

export const sendmail = async(from:string, to:string, subject:string, html:string)=>{
    try{
        const reponse = await transporter.sendMail({
            from: process.env.DEV_GMAIL_USER,
            to,
            subject: "Welcome",
            html,
        })
    }catch(err){
        console.log(err)
    }
}

export const emailHtml = (email:string, OTP:string)=>{
    const mail = `<h1>Welcome to Plutus<h1>
                    <p>You username: ${email}</p><br>
                    <p>Your OTP: ${OTP}</p><br>
                    <p>Thank You</p>`

                    return mail
}
