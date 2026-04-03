import jwt from 'jsonwebtoken'

/**
 * Protect Middleware
 * - Verifies JWT access token
 * - Attaches decoded user to request
 */
export const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    //1. check token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        const error = new Error('No token provided')
        error.statusCode = 401
        return next(error)
    }

    //2. Extract token
    const token = authHeader.split(" ")[1]

    try {
        //3. VERIFY TOKEN (expiry + signature)
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        //4. Attach user info
        req.user = decoded;

        //5. allow request
        next();

    } catch(e) {
        const error = new Error('Token invalid or expired')
        error.statusCode = 401
        return next(error)
    }

}