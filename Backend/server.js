//Core packages
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';

//Config
import connectDB from './config/connectDB.js';

//Middleware
import { protect } from './middleware/authMiddleware.js';

//Routes
import vanRouter from './routes/vanRoutes.js'
import hostVanRouter from './routes/hostVanRoutes.js';
import authRouter from './routes/authRouter.js'



const isProduction = process.env.NODE_ENV === 'production';

const app = express()

const PORT = process.env.PORT || 8000;

// ===== Database Connection =====
connectDB();

const corsOption = {
    origin: isProduction
        ? 'https://van-life-react-js-project.vercel.app'
        : 'http://localhost:5173',
    credentials: true
}

// ===== Global Middleware =====
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOption))


// ===== Routes =====
app.use('/api/vans', vanRouter)
app.use('/api/host', protect, hostVanRouter)
app.use('/api/auth', authRouter)


// ===== Start Server =====
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})