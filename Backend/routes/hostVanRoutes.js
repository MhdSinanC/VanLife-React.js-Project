import express from 'express'
import { getHostVans, postHostVan, updateHostVan, deleteHostVan, getHostVanById } from '../controllers/hostVansController.js';

const hostVanRouter = express.Router();

/**
 * Host Van Routes
 * Base path: /api/host
 * Protected routes (require authentication)
 */

// Get all vans owned by host
hostVanRouter.get('/vans', getHostVans)

// Create a new van
hostVanRouter.post('/vans', postHostVan)

// Get single van (owned by host only)
hostVanRouter.get('/vans/:id', getHostVanById)

// Update van (owner only)
hostVanRouter.put('/vans/:id', updateHostVan)

// Delete van (owner only)
hostVanRouter.delete('/vans/:id', deleteHostVan)


export default hostVanRouter;