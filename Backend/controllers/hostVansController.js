import Van from '../models/Van.js';


export async function getHostVans(req, res) {
    const hostVans = await Van.find({ hostId: req.user.id })
    res.json(hostVans)
}

export async function postHostVan(req, res) {
    const { name, price, description, type, imageUrl } = req.body;

    if (!name, !price, !description, !type, !imageUrl) {
        return res.status(400).json({ message: 'All fields are required!' })
    }

    try {
        //checking the van is already existing..
        const existingVan = await Van.findOne({ name: name, price: price, type: type, description: description })
        if (existingVan) {
            return res.status(409).json({ message: 'Van already exist!' })
        }

        //create Van
        await Van.create({
            name: name,
            price: price,
            description: description,
            imageUrl: imageUrl,
            type: type,
            hostId: req.user.id
        })

        return res.status(201).json({ message: 'New Van created!' })


    } catch (e) {
        res.status(500).json({message: `Adding Van failed: ${e}`})
    }
}