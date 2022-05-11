const Usuarios = require('../../models/Usuarios');
const ExposicionSolar = require('../../models/DatosExtrasUsuarios/ExposicionSolar');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { buscarUsuario } = require('../../constants/index');

router.get('/', async (req, res) => {
    const listaDSUsuarios = await ExposicionSolar.find();

    if (listaDSUsuarios.length <= 0)
        return res.status(500).json({
            success: false,
            message: 'No se encontro ninguna información de exposicion solar de los usuarios',
        });
    res.status(200).send(listaDSUsuarios);
});

router.get('/individual', async (req, res) => {
    try {
        const datosDeUsuario = await ExposicionSolar.find({
            usuario: req.query.usuario,
        });
        console.log(datosDeUsuario);
        if (!datosDeUsuario)
            return res.status(204).json({
                success: true,
                message: 'El usuario no tiene datos de exposicion solar todavia',
            });

        res.status(200).send(datosDeUsuario);
    } catch (err) {
        return res.status(500).json({
            success: true,
            error: err,
            message: 'Ocurrio un error al guardar los datos de exposicion solar',
        });
    }
});

router.post('/individual', async (req, res) => {
    try {
        const usuarioCreado = await Usuarios.findOne({
            usuario: req.query.usuario,
        });
        if (usuarioCreado) {
            const infoUsuario = await ExposicionSolar.findOne({
                usuario: req.query.usuario,
            });
            try {
                if (infoUsuario)
                    return res.status(500).json({
                        success: false,
                        message: 'Datos de exposicion solar de Usuario ya registrados',
                    });
            } catch (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Ocurrió un error al buscar los datos de exposicion solar del usuario',
                });
            }
        } else console.log('El usuario no existe');
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err,
            message: 'Ocurrió un error al buscar al usuario',
        });
    }

    let dExposicionSolar = new ExposicionSolar({
        usuario: req.query.usuario,
        minutosAlSol: req.body.minutosAlSol,
        cubresTuPiel: req.body.cubresTuPiel,
        bloqueadorSolar: req.body.bloqueadorSolar,
        diasXsemana: req.body.diasXsemana,
    });

    try {
        dExposicionSolar = await dExposicionSolar.save();

        if (!dExposicionSolar) return res.status(400).send('No se pudieron agregar datos de exposición solar');
        res.status(200).send(dExposicionSolar);
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err,
            message: 'Ocurrió un error al guardar los datos de exposición solar',
        });
    }
});

router.patch('/individual', async (req, res) => {
    try {
        const { usuarios } = req.query;

        let editarInformacionS = await ExposicionSolar.findOneAndUpdate(
            { usuario: usuario },
            {
                $push: {
                    minutosAlSol: req.body.minutosAlSol,
                    cubresTuPiel: req.body.cubresTuPiel,
                    bloqueadorSolar: req.body.bloqueadorSolar,
                    diasXsemana: req.body.diasXsemana,
                },
            }
        );

        editarInformacionS = await editarInformacionS.save();

        if (!editarInformacionS)
            return res.status(500).json({
                success: false,
                message: 'No se pudo actualizar los datos de exposicion solar',
            });

        res.status(200).send(editarInformacionS);
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err,
            message: ' Ocurrió un error al actualizar los datos de exposición solar- ',
        });
    }
});

module.exports = router;
