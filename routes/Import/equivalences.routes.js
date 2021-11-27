const Equivalencias = require('../../models/Equivalencias');
const express = require('express');
const router = express.Router();

const { buscarAlimentoPorNombre } = require('../../constants');

router.post('/', async (req, res) => {
    try {
        const { _id, nombreAlimento } = await buscarAlimentoPorNombre(
            req.body.alimento
        );
        //console.log('[ID] - ', _id, ' - [Nombre] - ', nombreAlimento);

        if (!id) {
            return res.status(404).send({
                Error: 'No se encontró el alimento proporcionado',
            });
        }

        let nuevaEquivalencia = new Equivalencias({
            alimento: req.body.alimento,
            idAlimento: _id,
            cantidadSugerida: req.body.cantidadSugerida,
            unidad: req.body.unidad,
            pesoNetoKg: req.body.pesoNeto,
            grupoAlimento: req.body.grupoAlimento,
        });

        nuevaEquivalencia = await nuevaEquivalencia.save();

        if (!nuevaEquivalencia) {
            return res
                .status(400)
                .send('Error al guardar la nueva equivalencia');
        }

        return res.status(200).send(nuevaEquivalencia);
    } catch (err) {
        console.log('Error al crear la equivalencia', err);
        return res
            .status(500)
            .send({ message: 'Error al crear la equivalencia', error: err });
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
        return res.status(500).send({
            message: 'Error al obtener la lista de equivalencias',
            error: err,
        });
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
            return res.status(204).send('No se encontraron resultados');

        return res.status(200).send(buscarEquivalencias);
    } catch (error) {
        return res.status(500).send({
            message: 'Error al obtener las equivalencias',
            error: error,
        });
    }
});

module.exports = router;
