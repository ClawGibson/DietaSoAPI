const Usuarios = require('../../models/Usuarios');
const IndicadoresClinicos = require('../../models/DatosExtrasUsuarios/IndicadoresClinicos');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { buscarUsuario } = require('../../constants/index');

router.get('/', async (req, res) => {
    const listaDSUsuarios = await IndicadoresClinicos.find();

    if (listaDSUsuarios.length <= 0)
        return res.status(500).json({
            success: false,
            message:
                'No se encontro ninguna información de indicadores clinicos de los usuarios',
        });
    res.send(listaDSUsuarios);
});

router.get('/individual', async (req, res) => {
    try {
        const usuarioCreado = await buscarUsuario(req.query.usuario);
        console.log(usuarioCreado);

        if (!usuarioCreado) {
            return res.status(500).json({
                success: false,
                message: 'El usuario no existe',
            });
        } else console.log('El usuario existe');

        try {
            const datosDeUsuario = await IndicadoresClinicos.findOne({
                usuario: req.query.usuario,
            });
            console.log(datosDeUsuario);
            if (!datosDeUsuario)
                return res.status(500).json({
                    success: true,
                    message:
                        'El usuario no tiene datos de indicadores clinicos todavia',
                });

            res.send(datosDeUsuario);
        } catch (err) {
            return res.status(500).json({
                success: true,
                message:
                    'Ocurrio un error al guardar los datos de indicadores clinicos',
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
            const infoUsuario = await IndicadoresClinicos.findOne({
                usuario: req.query.usuario,
            });
            try {
                if (infoUsuario)
                    return res.status(500).json({
                        success: false,
                        message:
                            'Datos de indicadores clinicos de Usuario ya registrados',
                    });
            } catch (err) {
                return res.status(500).json({
                    success: false,
                    message:
                        'Ocurrió un error al buscar los datos de indicadores clinicos del usuario',
                });
            }
        } else console.log('El usuario no existe');
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Ocurrió un error al buscar al usuario',
        });
    }

    let dIndicadoresC = new IndicadoresClinicos({
        usuario: req.query.usuario,
        presionArterial: req.body.presionArterial,
        acantosisNigricans: req.body.acantosisNigricans,
    });

    try {
        dIndicadoresC = await dIndicadoresC.save();

        if (!dIndicadoresC)
            return res
                .status(400)
                .send('No se pudieron agregar datos de indicadores clinicos');
        res.send(dIndicadoresC);
    } catch (err) {
        return res.status(500).json({
            success: false,
            message:
                'Ocurrió un error al guardar los datos de indicadores clinicos',
        });
    }
});

router.patch('/individual', async (req, res) => {
    try {
        const existeUsuario = await buscarUsuario(req.query.usuario);
        let editarInformacionS;
        if (!existeUsuario)
            return res
                .status(500)
                .json({ success: false, message: 'El usuario no existe.' });

        try {
            editarInformacionS = await IndicadoresClinicos.findOneAndUpdate(
                { usuario: existeUsuario.usuario },
                {
                    presionArterial: req.body.presionArterial,
                    acantosisNigricans: req.body.acantosisNigricans,
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
                    ' Ocurrió un error al actualizar los datos de indicadores clinicos- ',
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
