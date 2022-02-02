const Usuarios = require('../models/Usuarios');
const PuntosDeUsuario = require('../models/PuntosDeUsuario');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { buscarUsuario } = require('../constants/index');

router.get('/:id', async (req, res) => {
    buscarUsuario(req.params.id);

    try {
        const puntos = await PuntosDeUsuario.find({
            usuario: req.params.id,
        }).select('puntos');

        res.send(puntos);
    } catch (err) {
        console.log('Ocurrió un error al obtener los puntos - ', err);
    }
});

router.post('/:id', async (req, res) => {
    try {
        let puntos = new PuntosDeUsuario({
            usuario: req.body.usuario,
            puntos: req.body.puntos,
        });

        const puntosGuardados = await puntos.save();

        if (!puntosGuardados)
            return res
                .status(204)
                .send('No se pudo agregar el puntaje al usuario');
        res.status(200).send(puntosGuardados);
    } catch (err) {
        console.log(
            'Ocurrió un error al guardar el puntaje del usuario - ',
            err
        );
        res.status(500).send({ msg: 'Ocurrió un error', error: err });
    }
});

router.put('/:id', async (req, res) => {
    buscarUsuario(req.params.id);

    let nuevo;
    try {
        nuevo = await PuntosDeUsuario.find({ usuario: req.params.id });

        nuevo[0].puntos = req.body.puntos;

        nuevo = await nuevo[0].save();

        if (!nuevo)
            return res.status(500).json({
                success: false,
                message: 'No se pudo guardar - ',
                err,
            });
        res.send(nuevo);
    } catch (err) {
        console.log('Ocurrió un error al actualizar los puntos - ', err);
    }
});

module.exports = router;
