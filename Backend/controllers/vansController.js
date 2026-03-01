import Van from "../models/Van.js";

//GET all vans controller /api/vans
export async function getAllVans(req, res) {

    try {
        const vans = await Van.find();
        return res.status(200).json({
            success: true,
            count: vans.length,
            data: vans
        });
    }
    catch (e) {
        console.error("Error getting vans data:", e)

        res.status(500).json({
            success: false,
            message: 'Server error while fetching vans'
        })
    }

}





//GET single van by ID /api/vans/:id
export async function getVanById(req, res) {

    try {
        const { id } = req.params;
        const van = await Van.findById(id);

        if (!van) {
            return res.status(404).json({
                success: false,
                message: 'Van not found!'
            })
        }
        return res.status(200).json({
            success: true,
            data: van
        })
    }
    catch (e) {
        console.error("Error getting van data", e)

        return res.status(500).json({
            success: false,
            message: 'Server error while fetching van'
        })
    }
}