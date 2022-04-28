const Piramide = require('../../models/Piramide/Piramide');
const router = require('express').Router();
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
    try {
        const niveles = await Piramide.find();

        if (niveles.length <= 0)
            return res.status(204).json({
                success: false,
                message: 'No hay niveles',
            });

        res.status(200).send(niveles);
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Ocurrió un error al las imágenes por niveles',
            error: err,
        });
    }
});

router.post('/', async (req, res) => {
    try {
        let nivel = new Piramide({ ...req.body });

        nivel = await nivel.save();

        if (!nivel)
            return res.status(400).send({
                success: false,
                message: 'No se pudo agregar el nivel',
            });

        res.status(200).send(nivel);
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Ocurrió un error al crear la piramide',
            error: err,
        });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const nivel = await Piramide.findByIdAndUpdate(
            mongoose.Types.ObjectId(id),
            { $push: { url: req.body.url } },
            { new: true }
        );

        if (!nivel)
            return res.status(400).send({
                success: false,
                message: 'No se pudo actualizar el nivel',
            });

        res.status(200).send(nivel);
    } catch (err) {
        console.log('error', err);
        return res.status(500).json({
            success: false,
            message: 'Ocurrió un error al editar la piramide',
            error: err,
        });
    }
});

router.patch('/editarImagenes', async (req, res) => {
    try {
        const { id, url } = req.query;

        console.log('ID', id);
        console.log('URL', url);

        const nivel = await Piramide.findByIdAndUpdate(
            mongoose.Types.ObjectId(id),
            {
                $pull: {
                    $elemMatch: {
                        url: url,
                    },
                },
            },
            { new: true }
        );

        if (!nivel)
            return res.status(400).send({
                success: false,
                message: 'No se pudo actualizar el nivel',
            });

        res.status(200).send(nivel);
    } catch (err) {
        console.log('error', err);
        return res.status(500).json({
            success: false,
            message: 'Ocurrió un error al editar la piramide',
            error: err,
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        let nivel = await Piramide.findByIdAndDelete(mongoose.Types.ObjectId(id));

        if (!nivel)
            return res.status(400).send({
                success: false,
                message: 'No se pudo eliminar el nivel',
            });

        res.status(200).send(nivel);
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Ocurrió un error al eliminar la piramide',
            error: err,
        });
    }
});

module.exports = router;
