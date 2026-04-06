import jwt from 'jsonwebtoken';

/**
 * Generate short-lived access token
 * Used for authenticating API requests
 */
export const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '15m'
        }
    )
}

/**
 * Generate long-lived refresh token
 * Used to obtain new access tokens
 */
export const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: '7d'
        }
    )
}