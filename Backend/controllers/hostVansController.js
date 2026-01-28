import vansData from '../data.js'

export function getHostVans(req,res) {
    const hostVans = vansData.filter(data => data.hostId == 123)
    res.json(hostVans);
}

