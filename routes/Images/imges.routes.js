const express = require('express');
const router = express.Router();

const { cloudinary } = require('../../utils/cloudinary');

router.get('/', async (req, res, next) => {
    try {
        const images = await cloudinary.api.resources();
        res.status(200).json(images);
    } catch (error) {
        res.status(error.error.http_code).json(error);
    }
});

router.get('/:public_id', async (req, res, next) => {
    const { public_id } = req.params;

    try {
        const image = await cloudinary.api.resource(public_id);
        res.status(200).json(image);
    } catch (error) {
        res.status(error.error.http_code).json(error);
    }
});

module.exports = router;
