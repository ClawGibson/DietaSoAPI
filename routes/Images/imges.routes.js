const express = require('express');
const router = express.Router();
// const upload = require('../../utils/multer');
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

// router.post('/multi', upload.array('images'), async (req, res, next) => {
//     const data = [];

//     for (let file of req.files) {
//         const result = await cloudinary.uploader.upload(file.path);
//         data.push(result);
//     }

//     return res.status(200).json(data);
// });

// router.post('/', upload.single('image'), async (req, res, next) => {
//     try {
//         console.log('Request:', req);
//         const result = await cloudinary.uploader.upload(req.file.path);

//         return res.status(200).json({ image: result.public_id });
//     } catch (error) {
//         console.log('Error al subir la imagen', error);
//         return res.status(500).send({
//             succes: false,
//             message: 'Error al subir la imagen',
//             error: error,
//         });
//     }
// });

module.exports = router;
