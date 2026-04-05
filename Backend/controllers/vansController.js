import Van from "../models/Van.js";

/**
 * @desc Get all vans
 * @route GET /api/vans
 */
export const getAllVans = async (req, res) => {

    try {
        const vans = await Van.find();

        return res.status(200).json({
            success: true,
            count: vans.length,
            data: vans
        });
    }
    catch (err) {
        err.message = `Fetch vans failed: ${err.message}`;
        next(err);
    }

}





/**
 * @desc Get single van by ID
 * @route GET /api/vans/:id
 */
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
    catch (err) {
        err.message = `Fetch van failed: ${err.message}`;
        next(err);
    }
}