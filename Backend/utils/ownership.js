import Van from "../models/Van.js";

/**
 * Checks if van exists and belongs to the current user
 */
export const checkVanOwnership = async (vanId, userId) => {
    const van = await Van.findById(vanId);

    if (!van) {
        const err = new Error('Van not found')
        err.statusCode = 404;
        throw err;
    }

    if (van.hostId.toString() !== userId) {
        const err = new Error('Not authorized');
        err.statusCode = 403;
        throw err;
    }

    return van;
}