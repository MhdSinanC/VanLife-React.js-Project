import Van from '../models/Van.js';


export async function getHostVans(req,res) {
    const hostVans = await Van.find({hostId: 123})
    res.json(hostVans)
}