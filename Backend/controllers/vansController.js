import Van from "../models/Van.js";

export async function getAllVans(req, res) {

    try {
        return res.json(await Van.find())
    }
    catch (e) {
        console.error("Error getting vans data:", e)
    }

}






export async function getVanById(req, res) {

    try {
        const { id } = req.params;
        const van = await Van.findOne({ _id: id });
        return res.json(van)
    }
    catch (e) {
        console.error("Error getting van data", e)
    }
}