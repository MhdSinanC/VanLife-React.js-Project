import express from 'express'
import { getHostVans, postHostVan,updateVan, deleteHostVan } from '../controllers/hostVansController.js';
import { getVanById } from '../controllers/vansController.js';



const hostVanRouter = express.Router();

hostVanRouter.post('/vans', postHostVan)

hostVanRouter.get('/vans', getHostVans)

hostVanRouter.get('/vans/:id', getVanById)

hostVanRouter.put('/vans/:id', updateVan)

hostVanRouter.delete('/vans/:id', deleteHostVan)


export default hostVanRouter;