const Usuarios = require('../models/Usuarios');
const DatosUsuarios = require('../models/DatosUsuarios');
const PuntosDeUsuario = require('../models/PuntosDeUsuario');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { buscarUsuario } = require('../constants/index');

router.get('/', async (req, res) => {
    try {
        const listaDatos = await DatosUsuarios.find();

        if (listaDatos.length <= 0 || !listaDatos)
            return res.status(204).json({
                success: false,
                message: 'No se encontraron los datos de los usuarios',
            });

        res.status(200).send(listaDatos);
    } catch (err) {
        console.log('Error', err);
        return res.status(500).json({
            success: true,
            message:
                'Ocurrio un error al obtener la información de los usuarios',
        });
    }
});

router.get('/individual', async (req, res) => {
    try {
        const datosDeUsuario = await DatosUsuarios.find({
            usuario: req.query.usuario,
        }).select('peso altura actividadFisica registroPeso');
        console.log(datosDeUsuario);
        if (!datosDeUsuario)
            return res.status(204).json({
                success: true,
                message: 'El usuario no tiene datos todavia',
            });

        res.status(200).send(datosDeUsuario);
    } catch (err) {
        console.log('Error', err);
        return res.status(500).json({
            success: true,
            message: 'Ocurrio un error al buscar al usuario',
        });
    }
});

router.post('/individual', async (req, res) => {
    let datos = new DatosUsuarios({
        usuario: req.query.usuario,
        actividadFisica: req.body.actividadFisica,
        peso: req.body.peso,
        altura: req.body.altura,
        registroPeso: [Date.now()],
    });

    try {
        datos = await datos.save();

        if (!datos)
            return res
                .status(400)
                .send('No se pudieron agregar los datos del usuario');
        res.send(datos);
    } catch (err) {
        console.log('ERROR -> ', err);
        return res.status(500).json({
            success: false,
            message: 'Ocurrió un error al guardar los datos del usuario',
        });
    }
});

router.patch('/individual', async (req, res) => {
    const { usuario } = req.query;
    try {
        let editarInformacion = await DatosUsuarios.findOneAndUpdate(
            {
                usuario: usuario,
            },
            {
                $push: {
                    peso: Number(req.body.peso),
                    registroPeso: Date.now(),
                },
                altura: req.body.altura,
                actividadFisica: req.body.actividadFisica,
            }
        );

        editarInformacion = await editarInformacion.save();

        if (!editarInformacion)
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar la información del usuario',
            });

        res.status(200).send(editarInformacion);
    } catch (err) {
        console.log('Error', err);
        res.status(500).json({
            success: false,
            message: 'Ocurrió un error al actualizar los datos del usuario - ',
        });
    }
});

module.exports = router;
