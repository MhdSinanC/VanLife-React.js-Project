import express from 'express'
import { loginUser, logOutUser } from '../controllers/authController.js';
import refreshTokenController from '../controllers/refreshTokenController.js';

const authRouter = express.Router()


authRouter.post('/login', loginUser)

authRouter.post('/logout', logOutUser)

authRouter.get('/refresh', refreshTokenController) 

export default authRouter;