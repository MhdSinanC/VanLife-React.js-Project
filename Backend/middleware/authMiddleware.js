import jwt from 'jsonwebtoken'

export const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    //1. check token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: 'No token provided' })
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
        return res.status(401).json({message: 'token invalid or expired'})
    }

    


}