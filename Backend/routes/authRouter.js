import express from 'express'
import { loginUser, logOutUser, signupUser } from '../controllers/authController.js';
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
authRouter.post('/logout', logOutUser)

// Refresh access token
authRouter.get('/refresh', refreshTokenController) 

export default authRouter;