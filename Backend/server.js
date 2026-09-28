// ===== Core Packages =====
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';

// ===== Config =====
import connectDB from './config/connectDB.js';

// ===== Middleware =====
import { protect } from './middleware/authMiddleware.js';

// ===== Routes =====
import vanRouter from './routes/vanRoutes.js'
import hostVanRouter from './routes/hostVanRoutes.js';
import authRouter from './routes/authRouter.js'

// ===== Environment Setup =====
dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000;
const isProduction = process.env.NODE_ENV === 'production';

// ===== Database Connection =====
connectDB();

/**
 * CORS configuration
 * - Allows frontend to communicate with backend
 * - Credentials enabled for cookies (refresh token)
 */
const corsOption = {
    origin: isProduction
        ? process.env.CLIENT_URL
        : 'http://localhost:5173',
    credentials: true
}

// ===== Global Middleware =====
app.use(express.json())         // Parse JSON request body
app.use(cookieParser())         // Parse cookies
app.use(cors(corsOption))       // Enable CORS


// ===== Routes =====
app.use('/api/vans', vanRouter)

// Protected routes (require valid JWT)
app.use('/api/host', protect, hostVanRouter)
app.use('/api/auth', authRouter)

/**
 * Global Error Handler
 * - Centralized error handling
 * - Ensures consistent error response format
 */
app.use((err, req, res, next) => {
    console.error(err)

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    })
})


// ===== Health Check Route =====
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok' })
})

// ===== Start Server =====
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)

    // ===== Self-Ping (Keep alive on Render free tier) =====
    // Pings itself every 14 minutes to prevent spin-down
    if (isProduction) {
        const RENDER_URL = process.env.RENDER_URL;
        setInterval(async () => {
            try {
                await fetch(`${RENDER_URL}/api/health`)
                console.log('[Self-Ping] Server kept alive')
            } catch (err) {
                console.error('[Self-Ping] Failed:', err.message)
            }
        }, 14 * 60 * 1000) // 14 minutes
    }
})