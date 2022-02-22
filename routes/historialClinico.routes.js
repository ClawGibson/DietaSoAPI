const Usuarios = require('../models/Usuarios');
const HistorialClinico = require('../models/HistorialClinico');
const PuntosDeUsuario = require('../models/PuntosDeUsuario');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { buscarUsuario } = require('../constants/index');

router.get('/', async (req, res) => {
    const listaHMUsuarios = await HistorialClinico.find();

    if (listaHMUsuarios.length <= 0)
        return res.status(500).json({
            success: false,
            message: 'No se encontro ningun historial clinico de usuarios',
        });
    res.send(listaHMUsuarios);
});

router.get('/individual', async (req, res) => {
    try {
        const historiaClinica = await HistorialClinico.findOne({
            usuario: req.query.usuario,
        });

        if (!historiaClinica)
            return res.status(404).send({
                message: 'El usuario no tiene Historia clinica',
            });

        res.send(historiaClinica);
    } catch (err) {
        console.log('Error al buscar la información clínica individual', err);
        return res.status(500).send({
            message: 'Error al buscar la información clínica individual',
            error: err,
        });
    }
});

router.post('/individual', async (req, res) => {
    /* const usuarioCreado = await Usuarios.findOne({
        usuario: req.query.usuario,
    });
    try {
        if (usuarioCreado) {
            const infoUsuario = await HistorialClinico.findOne({
                usuario: req.query.usuario,
            });
            try {
                if (infoUsuario)
                    return res.status(500).json({
                        success: false,
                        message: 'Historial clinico de Usuario ya creado',
                    });
            } catch (err) {
                //console.log("Ocurrió un error al buscar el historial clinico del usuario usuario - ", err);
                return res.status(500).json({
                    success: false,
                    message:
                        'Ocurrió un error al buscar el historial clinico del usuario usuario',
                });
            }
        } else
            return res.status(500).json({
                success: false,
                message: 'El usuario no existe',
            });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Ocurrio un error al buscar al usuario',
        });
    } */

    let informacionCli = new HistorialClinico({
        usuario: req.query.usuario,
        historiaClinica: req.body.historiaClinica,
    });

    try {
        informacionCli = await informacionCli.save();

        if (!informacionCli)
            return res.status(400).send('No se pudo agregar historial clinico');
        res.send(informacionCli);
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Ocurrió un error al guardar el historial clinico',
        });
    }
});

router.patch('/individual', async (req, res) => {
    try {
        const existeUsuario = await buscarUsuario(req.query.usuario);
        let editarInformacionCli;
        console.log(existeUsuario);
        if (!existeUsuario)
            return res
                .status(500)
                .json({ success: false, message: 'El usuario no existe.' });

        try {
            editarInformacionCli = await HistorialClinico.findOneAndUpdate(
                { usuario: existeUsuario.usuario },
                {
                    historiaClinica: req.body.historiaClinica,
                }
            );

            editarInformacionCli = editarInformacionCli
                .save()
                .then((response) => res.status(200).json({ message: 'ok' }))
                .catch((err) =>
                    res.status(500).json({
                        success: false,
                        message: 'No se pudo guardar - ',
                        err,
                    })
                );
        } catch (err) {
            res.status(500).json({
                success: false,
                message:
                    'Ocurrió un error al actualizar el historial clinico - ',
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Ocurrió un error al buscar al usuario',
        });
    }
});

module.exports = router;
