const Equivalencias = require('../../models/Equivalencias');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        let nuevaEquivalencia = new Equivalencias({
            alimento: req.body.alimento,
            cantidadSugerida: req.body.cantidadSugerida,
            unidad: req.body.unidad,
            pesoNetoKg: req.body.pesoNeto,
            grupoAlimento: req.body.grupoAlimento,
        });

        try {
            nuevaEquivalencia = await nuevaEquivalencia.save();

            if (!nuevaEquivalencia) {
                return res
                    .status(500)
                    .send('Error al guardar la nueva equivalencia');
            }

            return res.status(200).send('Datos guardados exitosamente! :D');
        } catch (err) {
            return res
                .status(500)
                .send('Ocurrió un error al querer guardar los datos', err);
        }
    } catch (err) {
        return res.status(500).send('Error inesperado - ', err);
    }
});

router.get('/', async (req, res) => {
    try {
        const listaEquivalencias = await Equivalencias.find();
        if (!listaEquivalencias) {
            return res
                .status(500)
                .send('Error al obtener la lista de equivalencias');
        }
        return res.status(200).send(listaEquivalencias);
    } catch (err) {
        return res.status(500).send('Error inesperado - ', err.message);
    }
});

router.get('/grupoAlimento', async (req, res) => {
    console.log('query: ', req.query);
    try {
        const { grupoAlimento } = req.query;
        const buscarEquivalencias = await Equivalencias.find({
            grupoAlimento: grupoAlimento,
        });

        if (!buscarEquivalencias)
            return res.status(400).send('No se encontraron resultados');

        return res.status(200).send(buscarEquivalencias);
    } catch (error) {
        return res
            .status(500)
            .send('Error al obtener las equivalencias - ', error.message);
    }
});

module.exports = router;
