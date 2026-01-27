import express from 'express'
import { getHostVans } from '../controllers/hostVansController.js';
import { getVanById } from '../controllers/vansController.js';


const hostVanRouter = express.Router();

hostVanRouter.get('/vans', getHostVans)

hostVanRouter.get('/vans/:id', getVanById)


export default hostVanRouter;