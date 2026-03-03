import Resource from '../models/Resource.js';

export const getResourcesByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const resources = await Resource.find({ category });
        res.status(200).json({ success: true, data: resources });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};