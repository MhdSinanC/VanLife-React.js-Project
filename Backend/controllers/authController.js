import bcrypt from 'bcryptjs'
import User from '../models/User.js';
import { generateRefreshToken, generateToken } from '../utils/generateTokens.js';

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

    //save refresh in DB
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




export async function logOutUser(req,res) {
    const cookies = req.cookies;

    if(!cookies?.jwt) {
        return res.sendStatus(204);     //already logged out
    }

    const refreshToken = cookies.jwt;

    //find User and remove refresh token
    const user = await User.findOne({refreshToken: refreshToken});

    if(user) {
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