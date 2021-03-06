const Usuarios = require('../../models/Usuarios');
const IndicadoresSueño = require('../../models/DatosExtrasUsuarios/IndicadoresSueño');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { buscarUsuario } = require('../../constants/index');

router.get('/', async (req, res) => {
    const listaDSUsuarios = await IndicadoresSueño.find();

    if (listaDSUsuarios.length <= 0)
        return res.status(500).json({
            success: false,
            message:
                'No se encontro ninguna información de indicadores de sueño de los usuarios',
        });
    res.status(200).send(listaDSUsuarios);
});

router.get('/individual', async (req, res) => {
    try {
        const datosDeUsuario = await IndicadoresSueño.find({
            usuario: req.query.usuario,
        });

        if (!datosDeUsuario)
            return res.status(204).json({
                success: true,
                message: 'El usuario no tiene datos de indicadores de sueño todavia',
            });

        res.status(200).send(datosDeUsuario);
    } catch (err) {
        return res.status(500).json({
            success: true,
            error: err,
            message: 'Ocurrio un error al guardar los datos de indicadores de sueño',
        });
    }
});

router.post('/individual', async (req, res) => {
    const { usuario } = req.query;

    try {
        const infoUsuario = await IndicadoresSueño.findOne({
            usuario: usuario,
        });
        if (infoUsuario)
            return res.status(500).json({
                success: false,
                message: 'Datos de indicadores de sueño de Usuario ya registrados',
            });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message:
                'Ocurrió un error al buscar los datos de indicadores de sueño del usuario',
        });
    }

    try {
        let dIndicadoresS = new IndicadoresSueño({
            usuario: usuario,
            horasDeSueño: req.body.horasDeSueño,
            estadoDeDescanso: req.body.estadoDeDescanso,
            despiertaPorLaNoche: req.body.despiertaPorLaNoche,
            frecuencia: req.body.frecuencia,
        });

        dIndicadoresS = await dIndicadoresS.save();

        if (!dIndicadoresS)
            return res
                .status(400)
                .send('No se pudieron agregar datos de indicadores de sueño');

        res.status(200).send(dIndicadoresS);
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err,
            message: 'Ocurrió un error al guardar los datos de indicadores de sueño',
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
            editarInformacionS = await IndicadoresSueño.findOneAndUpdate(
                { usuario: existeUsuario.usuario },
                {
                    $push: {
                        horasDeSueño: req.body.horasDeSueño,
                        estadoDeDescanso: req.body.estadoDeDescanso,
                        despiertaPorLaNoche: req.body.despiertaPorLaNoche,
                        frecuencia: req.body.frecuencia,
                    },
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
                message:
                    ' Ocurrió un error al actualizar los datos de indicadores de sueño- ',
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err,
            message: ' Ocurrió un error al buscar el usuario- ',
        });
    }
});

module.exports = router;
