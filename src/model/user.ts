import { DataTypes, Model, Sequelize } from "sequelize"
import { db } from "../config"
import Investment, { INVESTMENT } from "./investment"
import Company from "./company"


type Saving = {
    id:string,
    amount:number,
}



export type IUSER = {
    id:string,
    firstName:string,
    lastName:string,
    accountNumber:string,
    savingsWallet:Saving,
    email:string,
    password:string,
    otp:string,
    token:string,
    imageUrl:string,
    notification:string,
    accountBalance:number,
    role: string,
    verify: boolean
}

// class User extends Model<IUSER>{
//     public static associate(models:INVESTMENT) {
//         User.hasMany(Investment, {foreignKey:'userId', as:'Investment'} )
//     }
// }
class User extends Model<IUSER>{
   id: string | undefined
   static id: string
    public static associate(models: { Investment: typeof Investment }): void {
        User.hasMany(models.Investment, { foreignKey: "userId", as: "Investment" });
      };
}

User.init({
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        allowNull:false
    },
    firstName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    accountNumber:{
        type:DataTypes.STRING,
        allowNull:true
    },
    savingsWallet:{
        type:DataTypes.JSON,
        allowNull:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
   otp:{
        type:DataTypes.STRING,
        allowNull:true
   },
   token:{
        type:DataTypes.STRING,
        allowNull:true
        },
    imageUrl:{
        type:DataTypes.STRING,
        allowNull:true
    },
    notification:{
        type:DataTypes.STRING,
        allowNull:true
    },
    accountBalance:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    role:{
        type:DataTypes.STRING,
        allowNull:true
    },
    verify:{
        type:DataTypes.BOOLEAN,
        allowNull:true
    }
}, {
    sequelize:db,
    tableName:"User",
    modelName:"User"
})





export default User