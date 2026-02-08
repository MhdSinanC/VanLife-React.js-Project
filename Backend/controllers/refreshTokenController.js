import User from "../models/User.js";
import { generateToken } from "../utils/generateTokens.js";
import jwt from 'jsonwebtoken'

export default async function refreshTokenController(req, res) {
    const cookies = req.cookies;

    if (!cookies) {
        return res.sendStatus(401);
    }

    const refreshToken = cookies.jwt;

    const user = await User.findOne({ refreshToken: refreshToken })

    if (!user) {
        return res.sendStatus(403);
    }

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (error, decoded) => {
            if (error || user._id.toString() !== decoded.id) {
                return res.sendStatus(403);
            }

            const accessToken = generateToken(user);
            return res.json({
                message: 'token refreshed',
                token: accessToken
            })
        }
    )
}