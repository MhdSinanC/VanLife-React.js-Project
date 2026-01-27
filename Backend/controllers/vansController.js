import  vansData from "../data.js"

export function getAllVans(req, res) {
    return res.json(vansData)
}

export function getVanById(req, res)  {
    const { id } = req.params;
    const van = vansData.find(van => van.id === id)
    return res.json(van)

}