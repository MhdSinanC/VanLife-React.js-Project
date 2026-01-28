import users from '../User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'

export async function loginUser(req, res) {
    const { email, password } = req.body


    const foundUser = users.find(user => user.email === email)

    if (!foundUser) {
        return res.status(401).json({ message: "No user with those credentials found" })
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (!isMatch) {
        return res.status(401).json({ message: "No user with those credentials found" })
    }

    const token = jwt.sign(
        { id: foundUser.id, email: foundUser.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    )

    return res.json({
        message: "Login Successful",
        token: token
    })
}