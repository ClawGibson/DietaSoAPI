const Recetas = require('../../models/RecetasURL/Recetas');

const router = require('express').Router();
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
    try {
        const videos = await Recetas.find();

        if (videos.length <= 0) return res.status(204).send({ message: 'No se encontraron videos' });

        res.status(200).send(videos);
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err,
            message: 'Ocurrió un error al obtener los videos',
        });
    }
});

router.get('/destacados', async (req, res) => {
    try {
        const destacados = await Recetas.find({ destacado: true });

        if (destacados.length <= 0) return res.status(204).send({ message: 'No se encontraron videos destacados' });

        res.status(200).send(destacados);
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err,
            message: 'Ocurrió un error al obtener los videos destacados',
        });
    }
});

router.post('/', async (req, res) => {
    try {
        let video = new Recetas({
            ...req.body,
        });

        video = await video.save();

        if (!video)
            return res.status(400).send({
                message: 'No se pudo guardar el video',
            });

        res.status(200).send(video);
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err,
            message: 'Ocurrió un error al crear un video',
        });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        let video = await Recetas.findByIdAndUpdate(id, { ...req.body }, { new: true });

        if (!video)
            return res.status(400).send({
                message: 'No se pudo actualizar el video',
            });

        res.status(200).send(video);
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err,
            message: 'Ocurrió un error al actualizar un video',
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        let video = await Recetas.findByIdAndDelete(id);

        if (!video)
            return res.status(400).send({
                message: 'No se pudo eliminar el video',
            });

        res.status(200).send(video);
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err,
            message: 'Ocurrió un error al eliminar un video',
        });
    }
});

module.exports = router;
