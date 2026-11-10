import Booking from "../models/Booking.js";
import Van from "../models/Van.js";



/**
 * @desc Create a new booking
 * @route POST /api/bookings
 */

export const createBooking = async (req, res, next) => {
    try {
        const { vanId, startDate, endDate } = req.body;

        // 1. Validate required fields
        if (!vanId || !startDate || !endDate) {
            return res.status(400).json({ message: 'vanId, startDate and endDate are required' });
        }

        // 2. End date must be after start date
        if (new Date(endDate) <= new Date(startDate)) {
            return res.status(400).json({ message: 'End date must be after start date' });
        }

        // 3. Find the van (we need its price)
        const van = await Van.findById(vanId);
        if (!van) {
            return res.status(404).json({ message: 'Van not found' })
        }

        // 4.Prevent host from booking their onw van 
        if (van.hostId.toString() === req.user.id) {
            return res.status(403).json({ message: "You can't book your own van" })
        }

        // 5. Calculate days and total price
        const msPerDay = 1000 * 60 * 60 * 24;
        const days = Math.ceil((new Date(endDate) - new Date(startDate)) / msPerDay);
        const totalPrice = days * van.price;

        // 6. Save booking to DB
        const booking = await Booking.create({
            vanId,
            renterId: req.user.id,      //comes from protect middleware (JWT)
            startDate,
            endDate,
            totalPrice
        })

        return res.status(201).json({
            success: true,
            data: booking
        })
    }
    catch (err) {
        next(err);
    }
}



/**
 * @desc Get all bookings for the logged-in user
 * @route GET /api/bookings/my
 */

export const getMyBookings = async (req, res, next) => {
    try {
        const bookings = await Booking
            .find({ renterId: req.user.id })
            .populate('vanId', 'name imageUrl price type')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: bookings
        });
    }
    catch (err) {
        next(err);
    }
}