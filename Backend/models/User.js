import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    refreshToken: String
})



const User = mongoose.model('User', userSchema)

export default User;