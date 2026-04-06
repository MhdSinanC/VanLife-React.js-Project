import bcrypt from 'bcryptjs'
import User from '../models/User.js';
import { generateRefreshToken, generateToken } from '../utils/generateTokens.js';

const isProduction = process.env.NODE_ENV === 'production';

/**
 * @desc Refresh access token using refresh token
 * @route GET /api/auth/refresh
 */
const setRefreshTokenCookie = (res, token) => {
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'None' : 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000     //7 days
    })
}

/**
 * @desc Login user
 * @route POST /api/auth/login
 */
export const loginUser = async (req, res, next) => {

    try {
        const { email, password } = req.body

        // 1. Find user
        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        // 2. Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        // 3. Generate tokens
        const accessToken = generateToken(user)
        const refreshToken = generateRefreshToken(user)

        // 4. Save refresh token in DB
        user.refreshToken = refreshToken;
        await user.save()

        // 5. Set cookie
        setRefreshTokenCookie(res, refreshToken);

        // 6. Send response
        return res.json({
            message: "Login Successful",
            token: accessToken
        })
    }
    catch (err) {
        next(err);
    }

}





/**
 * @desc Logout user
 * @route POST /api/auth/logout
 */
export const logOutUser = async (req, res, next) => {

    try {
        const cookies = req.cookies;

        if (!cookies?.jwt) {
            return res.sendStatus(204);     //Already logged out
        }

        const refreshToken = cookies.jwt;

        //find User and remove refresh token from DB
        const user = await User.findOne({ refreshToken: refreshToken });

        if (user) {
            user.refreshToken = '';
            await user.save()
        }


        //Clear cookie
        res.clearCookie('jwt', {
            httpOnly: true,
            sameSite: isProduction ? 'None' : 'Strict',
            secure: isProduction,
        })

        return res.sendStatus(204);
    }
    catch (err) {
        next(err);
    }

}








/**
 * @desc Register new user
 * @route POST /api/auth/signup
 */
export const signupUser = async (req, res, next) => {

    try {
        const { email, username, password, confirmPassword } = req.body;

        //1. Validation
        if (!email || !username || !password || !confirmPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        //2. check password is matching
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Password do not match' });
        }

        //3. check if the user is already exists
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const existingUsername = await User.findOne({ name: username })
        if (existingUsername) {
            return res.status(409).json({ message: 'Username already taken' })
        }

        //4. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //5. Create User
        const user = await User.create({
            email: email,
            password: hashedPassword,
            name: username
        })

        //6.Generate tokens
        const accessToken = generateToken(user);
        const refreshToken = generateRefreshToken(user);

        //7. Save refresh token in User DB
        user.refreshToken = refreshToken;
        await user.save();

        //8.Set refresh token cookie
        setRefreshTokenCookie(res, refreshToken);

        //9.Send access token to frontend memory
        res.status(201).json({ message: 'Login Successful', token: accessToken });
    }
    catch (err) {
        console.error('Signup error: ', err);

        const error = new Error('Signup failed');
        error.statusCode = 500;
        next(error);
    }

}