import express from 'express'
import vanRouter from './routes/vanRoutes.js'
import hostVanRouter from './routes/hostVanRoutes.js';
import loginRouter from './routes/loginRouter.js'
import cors from 'cors'

import dotenv from 'dotenv'
import { protect } from './middleware/authMiddleware.js';
dotenv.config()


const app = express()

const PORT = 8000;

app.use(express.json())

app.use(cors())

app.use('/api', vanRouter)

app.use('/api/host', protect, hostVanRouter)

app.use('/api/login', loginRouter)



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})