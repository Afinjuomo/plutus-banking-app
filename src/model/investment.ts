import { DataTypes, Model, Sequelize } from "sequelize"
import { db } from "../config"
import User from "./user"


enum Duration {
    THREE_MONTH = "3 Month",
    SIX_MONTH = "6 Month",
    TWELVE_MONTH = "12 Month",
  }
  
  

export type INVESTMENT = {
    id:string,
    userId:string,
    companyName:string,
    investedCapital:number,
    rateOfReturn:number,
    profit:number,
    duration:Duration,
    active:boolean
}

// class Investment extends Model<INVESTMENT>{
//     public static associate() {
//         Investment.belongsTo(User, {foreignKey:'userId', as:'User'})
//     }
// }

class Investment extends Model<INVESTMENT>{
    public static associate(models: { User: typeof User }): void {
    Investment.belongsTo(models.User, { foreignKey: "userId", as: "User" });
  };
}

Investment.init({
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        allowNull:false
    },
    userId:{
        type:DataTypes.UUID,
        references: {
            model: User,
            key: "id"
        }
    },
    companyName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    investedCapital:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    rateOfReturn:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    profit:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    duration:{
        type:DataTypes.STRING,
        allowNull:true
    },
   active:{
        type:DataTypes.BOOLEAN,
        allowNull:false
   }
}, {
    sequelize:db,
    tableName:"Investment",
    modelName:"Investment"
})



export default Investment