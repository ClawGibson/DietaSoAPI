const Usuarios = require('../../models/Usuarios');
const LactanciaUsuarios = require('../../models/DatosExtrasUsuarios/LactanciaUsuarios');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { buscarUsuario } = require('../../constants/index');

router.get('/', async (req, res) => {
    const listaDSUsuarios = await LactanciaUsuarios.find();

    if (listaDSUsuarios.length <= 0)
        return res.status(500).json({
            success: false,
            message: 'No se encontro ninguna información de lactancia de los usuarios',
        });
    res.send(listaDSUsuarios);
});

router.get('/individual', async (req, res) => {
    try {
        const datosDeUsuario = await LactanciaUsuarios.findOne({
            usuario: req.query.usuario,
        });
        console.log(datosDeUsuario);
        if (!datosDeUsuario)
            return res.status(204).json({
                success: true,
                message: 'El usuario no tiene datos de lactancia todavia',
            });

        res.send(datosDeUsuario);
    } catch (err) {
        return res.status(500).json({
            success: true,
            message: 'Ocurrio un error al guardar los datos de lactancia',
        });
    }
});

router.post('/individual', async (req, res) => {
    try {
        const { usuario } = req.query;

        let dLactancia = new LactanciaUsuarios({
            usuario,
            ...req.body,
        });

        dLactancia = await dLactancia.save();

        if (!dLactancia) return res.status(400).send('No se pudieron agregar datos de lactancia');
        res.send(dLactancia);
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Ocurrió un error al guardar los datos de lactancia',
        });
    }
});

router.patch('/individual', async (req, res) => {
    try {
        const { usuario } = req.query;
        let editarInformacionS = await LactanciaUsuarios.findOneAndUpdate(
            { usuario },
            {
                $push: {
                    ...req.body,
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
            message: ' Ocurrió un error al actualizar los datos de lactancia- ',
        });
    }
});

module.exports = router;
