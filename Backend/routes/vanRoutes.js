import express from 'express'
import { getAllVans, getVanById } from '../controllers/vansController.js';

const vanRouter = express.Router()


vanRouter.get('/vans', getAllVans)


vanRouter.get('/vans/:id', getVanById)


export default vanRouter;
