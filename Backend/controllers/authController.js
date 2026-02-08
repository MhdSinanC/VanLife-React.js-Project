import bcrypt from 'bcryptjs'
import User from '../models/User.js';
import { generateRefreshToken, generateToken } from '../utils/generateTokens.js';


//Login User controller
export async function loginUser(req, res) {
    const { email, password } = req.body


    const foundUser = await User.findOne({ email: email })

    if (!foundUser) {
        return res.status(401).json({ message: "No user with those credentials found" })
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (!isMatch) {
        return res.status(401).json({ message: "No user with those credentials found" })
    }

    const accessToken = generateToken(foundUser)
    const refreshToken = generateRefreshToken(foundUser)

    //save refreshToken in DB
    foundUser.refreshToken = refreshToken;
    await foundUser.save()

    //send refresh token as httpOnly cookie
    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    //send access token to browser memory
    return res.json({
        message: "Login Successful",
        token: accessToken
    })
}





//Logout User controller
export async function logOutUser(req, res) {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.sendStatus(204);     //already logged out
    }

    const refreshToken = cookies.jwt;

    //find User and remove refresh token
    const user = await User.findOne({ refreshToken: refreshToken });

    if (user) {
        user.refreshToken = '';
        await user.save()
    }


    //clear cookie
    res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
    })

    return res.sendStatus(204);
}








//Sign up user controller
export async function signupUser(req, res) {

    const { email, username, password, confirmPassword } = req.body;

    try {
        //1. basic validation
        if (!email || !username || !password || !confirmPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        //2. check password is match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Password do not match' });
        }

        //3. check if the user is already exists
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const existingUsername = await User.findOne({name: username})
        if(existingUsername) {
            return res.status(409).json({message: 'Username already taken'})
        }

        //4. hash password
        const hashedPassword = await bcrypt.hash(password, 10);


        //5.getting a new user id for the new user from last user
        const lastUser = await User.findOne().sort({id: -1});
        const newId = lastUser ? lastUser.id + 1 : 1; 



        //6.create User
        const user = await User.create({
            id: newId,
            email: email,
            password: hashedPassword,
            name: username
        })

        //7.generate tokens
        const accessToken = generateToken(user);
        const refreshToken = generateRefreshToken(user);

        //8. save refresh token in User DB
        user.refreshToken = refreshToken;
        await user.save();

        //9.set refresh token cookie
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        //10.send access token to frontend memory
        res.status(201).json({ message: 'Login Successful', token: accessToken });
    }
    catch (e) {
        res.status(500).json({ message: 'Signup failed' });
    }




}