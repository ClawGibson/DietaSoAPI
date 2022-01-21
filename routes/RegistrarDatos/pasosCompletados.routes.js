const PasosCompletados = require('../../models/PasosCompletados');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const pasos = await PasosCompletados.find();

        if (!pasos)
            return res.status(204).send({
                message: 'No se encontraron pasos',
            });

        res.status(200).send(pasos);
    } catch (error) {
        console.log('Eror al obtener los pasos completados', error);
        return res.status(500).send({
            message: 'Ocurrió un error inesperado',
            error: error,
        });
    }
});

router.post('/', async (req, res) => {
    try {
        let pasos = await new PasosCompletados(req.body);

        pasos = await pasos.save();

        if (!pasos)
            return res.status(204).send({
                message: 'No se pudo agregar los pasos',
            });

        res.status(200).send(pasos);
    } catch (error) {
        console.log('Eror al crear los pasos completados', error);
        return res.status(500).send({
            message: 'Ocurrió un error inesperado',
            error: error,
        });
    }
});

router.patch('/', async (req, res) => {
    try {
        const { usuario } = req.body;

        let pasos = await PasosCompletados.findOneAndUpdate(
            {
                usuario: usuario,
            },
            {
                ...req.body,
            },
            {
                new: true,
            }
        );

        pasos = await pasos.save();

        if (!pasos)
            return res.status(204).send({
                message: 'No se pudo guardar los pasos',
            });

        res.status(200).send(pasos);
    } catch (error) {
        console.log('Eror al actualizar los completados', error);
        return res.status(500).send({
            message: 'Ocurrió un error inesperado',
            error: error,
        });
    }
});

module.exports = router;
