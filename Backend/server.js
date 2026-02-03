import express from 'express'
import vanRouter from './routes/vanRoutes.js'
import hostVanRouter from './routes/hostVanRoutes.js';
import authRouter from './routes/authRouter.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';

import dotenv from 'dotenv'
import { protect } from './middleware/authMiddleware.js';
import connectDB from './config/connectDB.js';
dotenv.config()


const app = express()

const PORT = 8000;

connectDB();

app.use(express.json())

app.use(cookieParser())

app.use(cors({
    origin: 'http://localhost:5173/',
    credentials: true
}))

app.use('/api', vanRouter)

app.use('/api/host', protect, hostVanRouter)

app.use('/api/auth', authRouter)



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})