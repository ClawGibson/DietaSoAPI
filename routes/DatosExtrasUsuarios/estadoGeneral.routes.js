const Usuarios = require('../../models/Usuarios');
const EstadoGeneral = require('../../models/DatosExtrasUsuarios/EstadoGeneral');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { buscarUsuario } = require('../../constants/index');

router.get('/', async (req, res) => {
    const listaDSUsuarios = await EstadoGeneral.find();

    if (listaDSUsuarios.length <= 0)
        return res.status(500).json({
            success: false,
            message: 'No se encontro ninguna información de estado general de los usuarios',
        });
    res.status(200).send(listaDSUsuarios);
});

router.get('/individual', async (req, res) => {
    try {
        const datosDeUsuario = await EstadoGeneral.find({
            usuario: req.query.usuario,
        });
        console.log(datosDeUsuario);
        if (!datosDeUsuario)
            return res.status(204).json({
                success: true,
                message: 'El usuario no tiene datos de estado general todavia',
            });

        res.status(200).send(datosDeUsuario);
    } catch (err) {
        return res.status(500).json({
            success: true,
            error: err,
            message: 'Ocurrio un error al guardar los datos de estado general',
        });
    }
});

router.post('/individual', async (req, res) => {
    try {
        let dEstadoGeneral = new EstadoGeneral({
            ...req.body,
        });
        // Modifcar el post para agregar el objeto en forma de array.
        dEstadoGeneral = await dEstadoGeneral.save();

        if (!dEstadoGeneral) return res.status(400).send('No se pudieron agregar datos de estado general');
        res.status(200).send(dEstadoGeneral);
    } catch (err) {
        console.log('errror', err);
        return res.status(500).json({
            success: false,
            error: err,
            message: 'Ocurrió un error al guardar los datos de estado general',
        });
    }
});

router.patch('/individual', async (req, res) => {
    const { usuario } = req.query;

    let editarInformacionS;

    try {
        editarInformacionS = await EstadoGeneral.findOneAndUpdate(
            { usuario: usuario },
            {
                $push: {
                    muchoCansancio: req.body.muchoCansancio,
                    mareos: req.body.mareos,
                    muchaSed: req.body.muchaSed,
                    muchasGanasDeOrinar: req.body.muchasGanasDeOrinar,
                    muchaHambre: req.body.muchaHambre,
                    piesYmanos: req.body.piesYmanos,
                    nariz: req.body.nariz,
                    piel: req.body.piel,
                    unas: req.body.unas,
                    cabello: req.body.cabello,
                    boca: req.body.boca,
                },
                tipoDeNacimiento: req.body.tipoDeNacimiento,
            }
        );

        editarInformacionS = await editarInformacionS.save();

        if (!editarInformacionS) return res.status(400).send('No se pudo actualizar');

        res.status(200).send(editarInformacionS);
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err,
            message: ' Ocurrió un error al actualizar los datos de estado general- ',
        });
    }
});

module.exports = router;
