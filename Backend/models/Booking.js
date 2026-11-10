import mongoose from "mongoose";


const bookingSchema = new mongoose.Schema({

    vanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Van',
        required: true
    },

    renterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    startDate: {
        type: Date,
        required: true
    },

    endDate: {
        type: Date,
        required: true
    },

    totalPrice: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'confirmed'
    }
}, { timestamps: true })


const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;