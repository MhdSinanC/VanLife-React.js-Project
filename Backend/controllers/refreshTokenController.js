import User from "../models/User.js";
import { generateToken } from "../utils/generateTokens.js";
import jwt from 'jsonwebtoken'

/**
 * @desc Refresh access token using refresh token
 * @route GET /api/auth/refresh
 */
const refreshTokenController = async (req, res, next) => {

    try {
        const cookies = req.cookies;

        // 1. Check if refresh token exists
        if (!cookies?.jwt) {
            return res.status(401).json({ message: 'No refresh token provided' });
        }

        const refreshToken = cookies.jwt;

        // 2. Find user with this refresh token
        const user = await User.findOne({ refreshToken: refreshToken })

        if (!user) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        // 3. Verify refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

        // 4. Extra security check
        if (user._id.toString() !== decoded.id) {
            return res.status(403).json({
                message: "Token mismatch"
            })
        }

        // 5. Generate new access token
        const accessToken = generateToken(user);

        return res.status(200).json({
            message: 'Token refreshed',
            token: accessToken
        })
    }
    catch (err) {
        err.message = `Refresh token failed: ${err.message}`;
        next(err)
    }
}

export default refreshTokenController;