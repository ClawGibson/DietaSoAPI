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
            message:
                'No se encontro ninguna información de estado general de los usuarios',
        });
    res.send(listaDSUsuarios);
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

        res.send(datosDeUsuario);
    } catch (err) {
        return res.status(500).json({
            success: true,
            message: 'Ocurrio un error al guardar los datos de estado general',
        });
    }
});

router.post('/individual', async (req, res) => {
    try {
        const usuarioCreado = await Usuarios.findOne({
            usuario: req.query.usuario,
        });
        if (usuarioCreado) {
            const infoUsuario = await EstadoGeneral.findOne({
                usuario: req.query.usuario,
            });
            try {
                if (infoUsuario)
                    return res.status(500).json({
                        success: false,
                        message:
                            'Datos de estado general de Usuario ya registrados',
                    });
            } catch (err) {
                return res.status(500).json({
                    success: false,
                    message:
                        'Ocurrió un error al buscar los datos de estado general del usuario',
                });
            }
        } else console.log('El usuario no existe');
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Ocurrió un error al buscar al usuario',
        });
    }

    let dEstadoGeneral = new EstadoGeneral({
        usuario: req.query.usuario,
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
        tipoDeNacimiento: req.body.tipoDeNacimiento,
    });

    try {
        dEstadoGeneral = await dEstadoGeneral.save();

        if (!dEstadoGeneral)
            return res
                .status(400)
                .send('No se pudieron agregar datos de estado general');
        res.send(dEstadoGeneral);
    } catch (err) {
        return res.status(500).json({
            success: false,
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
                    tipoDeNacimiento: req.body.tipoDeNacimiento,
                },
            }
        );

<<<<<<< Updated upstream
        try {
            editarInformacionS = await EstadoGeneral.findOneAndUpdate(
                { usuario: existeUsuario.usuario },
                {
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
                    tipoDeNacimiento: req.body.tipoDeNacimiento,
                }
            );
=======
        editarInformacionS = await editarInformacionS.save();
>>>>>>> Stashed changes

        if (!editarInformacionS)
            return res.status(400).send('No se pudo actualizar');

        res.send(editarInformacionS);
    } catch (err) {
        res.status(500).json({
            success: false,
            message:
                ' Ocurrió un error al actualizar los datos de estado general- ',
        });
    }
});

module.exports = router;
