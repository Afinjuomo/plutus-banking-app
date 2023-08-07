import dotenv from 'dotenv'

dotenv.config()

const {PROD_PORT, DB_NAME} = process.env

export default {
    PORT:PROD_PORT, // {PORT : 6000}
    DB_NAME:DB_NAME
}


console.log("running in productionx mode")
