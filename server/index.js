import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
const app = express();


dotenv.config();

connectDB();

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


app.use('/api',userRoutes)
app.use('/api',adminRoutes)



const PORT = process.env.PORT;
app.listen(PORT,(req,res)=>{
    console.log(`server is running on port ${PORT}`)
});
