import mongoose from "mongoose";


const vansSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    imageUrl: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true
    },
    hostId: {
        type: Number,
        required: true
    }
})



const Van = mongoose.model('Van', vansSchema);


export default Van;