const Usuarios = require('../models/Usuarios');
const DatosSocioeconomicos = require('../models/DatosSocioeconomicos');
const PuntosDeUsuario = require('../models/PuntosDeUsuario');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { buscarUsuario } = require('../constants/index');

router.get('/', async (req, res) => {
    const listaDSUsuarios = await DatosSocioeconomicos.find();

    if (listaDSUsuarios.length <= 0)
        return res.status(500).json({
            success: false,
            message:
                'No se encontro ninguna informacion de datos socioeconomicos de los usuarios',
        });
    res.send(listaDSUsuarios);
});

router.get('/individual', async (req, res) => {
    try {
        const usuarioCreado = await buscarUsuario(req.query.usuario);

        if (!usuarioCreado) {
            return res.status(500).json({
                success: false,
                message: 'El usuario no existe',
            });
        } else console.log('El usuario existe');

        try {
            const datosDeUsuario = await DatosSocioeconomicos.findOne({
                usuario: req.query.usuario,
            }).select('nivelSocioeconomico');
            console.log(datosDeUsuario);
            if (!datosDeUsuario)
                return res.status(204).json({
                    success: true,
                    message: 'El usuario no tiene datos socioeconomicos todavia',
                });

            res.send(datosDeUsuario);
        } catch (err) {
            return res.status(500).json({
                success: true,
                message: 'Ocurrio un error al guardar los datos socioeconomicos',
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: true,
            message: 'Ocurrio un error al buscar usuario',
        });
    }
});

router.post('/individual', async (req, res) => {
    try {
        const usuarioCreado = await Usuarios.findOne({
            usuario: req.query.usuario,
        });
        if (usuarioCreado) {
            const infoUsuario = await DatosSocioeconomicos.findOne({
                usuario: req.query.usuario,
            });
            try {
                if (infoUsuario)
                    return res.status(500).json({
                        success: false,
                        message: 'Datos socioeconomicos de Usuario ya registrados',
                    });
            } catch (err) {
                return res.status(500).json({
                    success: false,
                    message:
                        'Ocurrió un error al buscar los datos socioeconomicos del usuario',
                });
            }
        } else console.log('El usuario no existe');
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Ocurrió un error al buscar al usuario',
        });
    }

    let dSocioeconomicos = new DatosSocioeconomicos({
        usuario: req.query.usuario,
        nivelSocioeconomico: req.body.nivelSocioeconomico,
    });

    try {
        dSocioeconomicos = await dSocioeconomicos.save();

        if (!dSocioeconomicos)
            return res.status(400).send('No se pudieron agregar datos socioeconomicos');
        res.send(dSocioeconomicos);
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Ocurrió un error al guardar los datos socioeconomicos',
        });
    }
});

router.patch('/individual', async (req, res) => {
    try {
        const existeUsuario = await buscarUsuario(req.query.usuario);
        let editarInformacionS;

        if (!existeUsuario)
            return res.status(500).json({ success: false, message: 'El usuario no existe.' });

        try {
            editarInformacionS = await DatosSocioeconomicos.findOneAndUpdate(
                { usuario: existeUsuario.usuario },
                {
                    nivelSocioeconomico: req.body.nivelSocioeconomico,
                }
            );

            editarInformacionS = editarInformacionS
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
                message: 'Ocurrió un error al actualizar los datos socioeconomicos-',
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: ' Ocurrió un error al buscar el usuario- ',
        });
    }
});

module.exports = router;
