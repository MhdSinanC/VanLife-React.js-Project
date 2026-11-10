import express from "express";
import { createBooking, getMyBookings } from "../controllers/bookingController.js";


const bookingRouter = express.Router();

// POST /api/bookings      → create a booking
bookingRouter.post('/', createBooking);

// GET /api/bookings/my    → get current user's bookings
bookingRouter.get('/my', getMyBookings);


export default bookingRouter;