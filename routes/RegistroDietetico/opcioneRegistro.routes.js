const OpcionesRegistro = require('../../models/OpcionesRegistro');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const opciones = await OpcionesRegistro.find();

        if (!opciones)
            return res.status(204).send({
                message: 'No se encontraron opciones de registro',
            });

        res.status(200).send(opciones);
    } catch (error) {
        return res.status(500).send({
            message: 'Ocurrió un error inesperado',
            error: error,
        });
    }
});

router.post('/', async (req, res) => {
    try {
        let opciones = new OpcionesRegistro({
            ...req.body,
        });

        opciones = await opciones.save();

        if (!opciones)
            return res.status(204).send({
                message: 'No se pudo agregar las opciones de registro',
            });

        res.status(200).send(opciones);
    } catch (error) {
        return res.status(500).send({
            message: 'Ocurrió un error inesperado',
            error: error,
        });
    }
});

router.patch('/', async (req, res) => {
    try {
        const opciones = await OpcionesRegistro.findOneAndUpdate({}, { ...req.body }, { new: true });

        if (!opciones)
            return res.status(204).send({
                message: 'No se pudo guardar las opciones de registro',
            });

        res.status(200).send(opciones);
    } catch (error) {
        return res.status(500).send({
            message: 'Ocurrió un error inesperado',
            error: error,
        });
    }
});

module.exports = router;
