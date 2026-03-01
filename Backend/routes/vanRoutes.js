import express from 'express'
import { getAllVans, getVanById } from '../controllers/vansController.js';

const vanRouter = express.Router()

//GET all vans from /api/vans
vanRouter.get('/', getAllVans)

//GET single van from /api/vans/:id
vanRouter.get('/:id', getVanById)


export default vanRouter;
