import express from 'express'
import { loginUser, logoutUser, signupUser } from '../controllers/authController.js';
import refreshTokenController from '../controllers/refreshTokenController.js';

const authRouter = express.Router();

/**
 * Auth Routes
 * Base path: /api/auth
 */

// Register new user
authRouter.post('/signup', signupUser)

// Login user
authRouter.post('/login', loginUser)

// Logout user
authRouter.post('/logout', logoutUser)

// Refresh access token
authRouter.get('/refresh', refreshTokenController) 

export default authRouter;