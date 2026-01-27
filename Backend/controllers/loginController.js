import users from '../User.js';
import jwt from 'jsonwebtoken';

export function loginUser(req,res) {
    const {email, password} = req.body

    const foundUser = users.find(user => user.email === email && user.password === password)
    
    if(!foundUser) {
        return res.status(401).json({message: "No user with those credentials found"})
    }

    const token = jwt.sign(
        {id: foundUser.id, email: foundUser.email},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '15m'}
    )

    return res.json({
        message: "Login Successful",
        token: token
    })
}