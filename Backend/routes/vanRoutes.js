import express from 'express'
import { getAllVans, getVanById } from '../controllers/vansController.js';

const vanRouter = express.Router()

/**
 * Public Van Routes
 * Base path: /api/vans
 */

// Get all vans
vanRouter.get('/', getAllVans)

// Get single van by ID
vanRouter.get('/:id', getVanById)

export default vanRouter;