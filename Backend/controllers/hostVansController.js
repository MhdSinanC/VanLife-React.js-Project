import Van from '../models/Van.js';


/**
 * @desc Get all vans for logged-in host
 * @route GET /api/host/vans
 */
export const getHostVans = async (req, res, next) => {

    try {
        const hostVans = await Van.find({ hostId: req.user.id })
        res.json(hostVans)
    }
    catch (err) {
        next(err);
    }

}


/**
 * @desc Create a new van
 * @route POST /api/host/vans
 */
export const postHostVan = async (req, res, next) => {

    try {

        const { name, price, description, type, imageUrl } = req.body;

        // 1. Validation
        if (!name || !price || !description || !type || !imageUrl) {
            return res.status(400).json({ message: 'All fields are required!' })
        }

        // 2. Check for duplicate van
        const existingVan = await Van.findOne({ name: name, price: price, hostId: req.user.id })

        if (existingVan) {
            return res.status(409).json({ message: 'Van already exists!' })
        }

        // 3. Create van
        await Van.create({
            name: name,
            price: price,
            description: description,
            imageUrl: imageUrl,
            type: type,
            hostId: req.user.id
        })

        return res.status(201).json({ message: 'Van created successfully' })

    } catch (err) {
        err.message = `Create van failed: ${err.message}`;
        next(err);
    }
}


/**
 * @desc Update a van (only owner)
 * @route PUT /api/host/vans/:id
 */
export const updateVan = async (req, res, next) => {

    try {
        const { id } = req.params;

        // 1. Check if van exists
        const van = await Van.findById(id);
        if (!van) {
            return res.status(404).json({ message: 'Van not found' })
        }

        // 2. Ownership check
        if (van.hostId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not Authorized' });
        }

        // 3. Update van
        const updatedVan = await Van.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )

        return res.json(updatedVan);
    }
    catch (err) {
        err.message = `Update van failed: ${err.message}`;
        next(err);
    }

}


/**
 * @desc Delete a van (only owner)
 * @route DELETE /api/host/vans/:id
 */
export const deleteHostVan = async (req, res, next) => {
    try {
        const { id } = req.params;

        // 1. Check if van exists
        const van = await Van.findById(id);
        if (!van) {
            return res.status(404).json({ message: "Van not found!" });
        }

        // 2. Ownership check
        if (van.hostId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        // 3. Delete van
        await Van.findByIdAndDelete(id);

        return res.status(200).json({ message: 'Van deleted' });
    }
    catch (err) {
        err.message = `Delete van failed: ${err.message}`
        next(err);
    }
}