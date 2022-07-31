const DatosSocioeconomicos = require('../models/DatosSocioeconomicos');
const express = require('express');
const router = express.Router();

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
        const datosDeUsuario = await DatosSocioeconomicos.findOne({
            usuario: req.query.usuario,
        }).select('nivelSocioeconomico');

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
});

router.post('/individual', async (req, res) => {
    try {
        const infoUsuario = await DatosSocioeconomicos.findOne({
            usuario: req.query.usuario,
        });

        if (infoUsuario)
            return res.status(500).json({
                success: false,
                message: 'Datos socioeconomicos de Usuario ya registrados',
            });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Ocurrió un error al buscar los datos socioeconomicos del usuario',
        });
    }

    try {
        let dSocioeconomicos = new DatosSocioeconomicos({
            usuario: req.query.usuario,
            nivelSocioeconomico: req.body.nivelSocioeconomico,
        });

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
        const { usuario } = req.query;
        let editarInformacionS;

        editarInformacionS = await DatosSocioeconomicos.findOneAndUpdate(
            { usuario: usuario },
            { nivelSocioeconomico: req.body.nivelSocioeconomico }
        );

        editarInformacionS = await editarInformacionS.save();

        if (!editarInformacionS)
            return res.status(400).send('No se pudieron editar los datos socioeconomicos');

        res.status(200).send(editarInformacionS);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Ocurrió un error al actualizar los datos socioeconomicos-',
        });
    }
});

module.exports = router;
