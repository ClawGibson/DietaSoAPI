const Equivalencias = require('../models/Equivalencias');
const GrupoAlimentos = require('../models/GrupoAlimentos');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
    try {
        const gruposDeAlimentos = await GrupoAlimentos.find().select(
            'grupoDeAlimento src'
        );

        if (!gruposDeAlimentos) {
            res.status(500).json({ success: false });
        }
        res.send(gruposDeAlimentos);
    } catch (error) {
        return res.status(500).send({ success: false, error: error.message });
    }
});

router.get('/detalles', async (req, res) => {
    try {
        const { grupoAlimento } = req.query;

        const equivaleniasPorGrupo = await Equivalencias.find({
            grupoAlimento: grupoAlimento,
        });

        if (!equivaleniasPorGrupo)
            return res.status(500).json({ success: false });

        res.send(equivaleniasPorGrupo);
    } catch (error) {
        return res.status(500).send({ success: false, error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        let nuevoGrupo = new GrupoAlimentos({
            ...req.body,
        });

        nuevoGrupo = await nuevoGrupo.save();

        if (!nuevoGrupo)
            return res.status(400).send('No se pudo crear el grupo :c');

        res.status(200).send(nuevoGrupo);
    } catch (error) {
        return res.status(500).send({ success: false, error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const nuevoGrupo = await GrupoAlimentos.findOneAndUpdate(
            req.params.id,
            {
                grupoDeAlimento: req.body.grupoDeAlimento,
            },
            {
                new: true,
            }
        );

        if (!nuevoGrupo)
            return res
                .status(404)
                .send('El grupo no se encontró o no se pudo editar :c');

        res.status(200).send(nuevoGrupo);
    } catch (error) {
        return res.status(500).send({ success: false, error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id))
            return res
                .status(400)
                .send('El ID del grupo de alimento a eliminar no es válido.');

        const nuevoGrupo = await nuevoGrupo.findByIdAndRemove(req.params.id);

        if (!nuevoGrupo)
            return res
                .status(400)
                .send('No se encontró el grupo a eliminar :c');

        res.status(200).send('Grupo eliminado :D!');
    } catch (error) {
        return res.status(500).send({ success: false, error: error.message });
    }
});

module.exports = router;
