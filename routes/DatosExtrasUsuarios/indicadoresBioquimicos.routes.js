const Usuarios = require('../../models/Usuarios');
const IndicadoresBioquimicos = require('../../models/DatosExtrasUsuarios/IndicadoresBioquimicos');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { buscarUsuario } = require('../../constants/index');

router.get('/', async (req, res) => {
    const listaDSUsuarios = await IndicadoresBioquimicos.find();

    if (listaDSUsuarios.length <= 0)
        return res.status(500).json({
            success: false,
            message:
                'No se encontro ninguna información de indicadores bioquimicos de los usuarios',
        });
    res.send(listaDSUsuarios);
});

router.get('/individual', async (req, res) => {
    try {
        const datosDeUsuario = await IndicadoresBioquimicos.find({
            usuario: req.query.usuario,
        });
        console.log(datosDeUsuario);
        if (!datosDeUsuario)
            return res.status(204).json({
                success: true,
                message:
                    'El usuario no tiene datos de indicadores bioquimicos todavia',
            });

        res.send(datosDeUsuario);
    } catch (err) {
        return res.status(500).json({
            success: true,
            message:
                'Ocurrio un error al guardar los datos de indicadores bioquimicos',
        });
    }
});

router.post('/individual', async (req, res) => {
    try {
        let dIndicadoresB = new IndicadoresBioquimicos({
            usuario: req.query.usuario,
            glucosaAyuno: req.body.glucosaAyuno,
            glucosaDespues: req.body.glucosaDespues,
            trigliceridos: req.body.trigliceridos,
            colesterolTotal: req.body.colesterolTotal,
            colesterolLDL: req.body.colesterolLDL,
            colesterolHDL: req.body.colesterolHDL,
            microbiotaIntestinal: req.body.microbiotaIntestinal,
        });

        dIndicadoresB = await dIndicadoresB.save();

        if (!dIndicadoresB)
            return res
                .status(400)
                .send(
                    'No se pudieron agregar datos de indicadores bioquimicos'
                );

        res.status(200).send(dIndicadoresB);
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err,
            message:
                'Ocurrió un error al guardar los datos de indicadores bioquimicos',
        });
    }
});

router.patch('/individual', async (req, res) => {
    try {
        editarInformacionS = await IndicadoresBioquimicos.findOneAndUpdate(
            { usuario: req.query.usuario },
            {
                $push: {
                    glucosaAyuno: req.body.glucosaAyuno,
                    glucosaDespues: req.body.glucosaDespues,
                    trigliceridos: req.body.trigliceridos,
                    colesterolTotal: req.body.colesterolTotal,
                    colesterolLDL: req.body.colesterolLDL,
                    colesterolHDL: req.body.colesterolHDL,
                    microbiotaIntestinal: req.body.microbiotaIntestinal,
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
            error: err,
            message:
                ' Ocurrió un error al actualizar los datos de indicadores bioquimicos- ',
        });
    }
});

module.exports = router;
