import express from 'express'
import dotenv from 'dotenv'
import {db} from "./config"
import { HttpError } from 'http-errors'
import config from "./config/dbConfig";
import userRoute from './routes/users.routes';
import beneficiaryRoute from './routes/beneficiaries.routes'
import transferRoute from './routes/transfer.route'
import cors from 'cors';


const { PORT } = config

dotenv.config()

const app = express()
app.use(express.json());
app.use(cors())

app.use('/user', userRoute)
app.use('/beneficiaries', beneficiaryRoute)
app.use('/transfer', transferRoute)


app.get('/', (req, res) => {
    return res.send('Hello World!')
    }
)

db.sync({}).then(() => {
    console.log('Database is connected');
    }).catch((err:HttpError) => {
    console.log(err);
});


const port = PORT 



app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

export default app
