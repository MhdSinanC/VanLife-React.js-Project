import express from "express";
import { createBooking, getMyBookings, cancelBooking } from "../controllers/bookingController.js";


const bookingRouter = express.Router();

// POST /api/bookings      → create a booking
bookingRouter.post('/', createBooking);

// GET /api/bookings/my    → get current user's bookings
bookingRouter.get('/my', getMyBookings);

//PATCH /api/bookings/:id/cancel    → cancel a booking
bookingRouter.patch('/:id/cancel', cancelBooking);


export default bookingRouter;