import express, { Request, Response, NextFunction } from "express";
import Beneficiary, { BeneficiaryDetails, BeneficiaryType } from "../model/beneficiary";
import User from "../model/user";
import { v4 } from "uuid";
import { STRING } from "sequelize";
import { UUID } from "sequelize";

export const getBeneficiaries = async (req: Request, res: Response) => {
   try {
     const id = req.params.id;

     console.log('Fetching beneficiaries for id:', id); // Add this line
     const beneficiaries = await Beneficiary.findAll({ where: { id: id } });
     res.status(200).json(beneficiaries);

   } catch (error) {
     console.error('Error fetching beneficiaries:', error);
     res.status(500).json({ error: 'Internal server error' });
   }
 };
 
export const createBeneficiaries = async (
   req: Request,
   res: Response,
   NextFunction: NextFunction
 ) => {
   try {
     const { userId, beneficiaryName, accountNumber, beneficiaryType } = req.body;
 
     // Generate UUID for the beneficiary id
     const id = v4();
 
     // Query for the user based on userId (not accountNumber)
     const user = await User.findOne({ where: { id: userId } });
 
     if (!user) {
       return res.status(404).json({
         error: "User not found",
       });
     }
 
     const mappedBeneficiaryType =
       beneficiaryType === "Individual"
         ? BeneficiaryType.INDIVIDUAL
         : BeneficiaryType.COMPANY;
 
     const newBeneficiary = await Beneficiary.create({
       id,
       userId: User.id, // Assign the user's id
       beneficiaryName,
       accountNumber,
       beneficiaryType: mappedBeneficiaryType,
     });
 
     res.status(200).json({
       message: "Beneficiary created successfully",
       newBeneficiary,
     });
   } catch (error) {
     console.error("Error creating beneficiary", error);
     res.status(500).json({
       error: "Internal server error",
     });
   }
 };
 export const deleteBeneficiary = async (req: Request, res: Response, NextFunction: NextFunction) =>{
      try{
           const id = req.params.id;
           const deleteId = await Beneficiary.destroy({
                 where: {id: id },
           });
           if(deleteId > 0) {
            res.status(200).json({
               message: "Beneficiary deleted successfully"
            });
           } else {
            res.status(404).json({
               error: "Beneficiary not found"
            });
           }
      }catch(error){
         console.error('Error deleting Beneficiary', error);
         res.status(500).json({
            error: 'Internal server error'
         })
      }
 }