const Usuarios = require('../../models/Usuarios');
const Gastrointestinales = require('../../models/DatosExtrasUsuarios/Gastrointestinales');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { buscarUsuario } = require('../../constants/index');

const buscarUsuarioo = async (id) => {
    try {
        const buscarUsuarioo = await Usuarios.find({
            usuario: id,
        });

        if (!buscarUsuarioo)
            return res.status(404).send({
                Error: 'No se encontró el registro de informacion de usuario',
            });
        return buscarUsuarioo;
    } catch (error) {
        return res.status(500).json({
            error: `Error al buscar informacion de usuario - ${error}`,
        });
    }
};

router.get('/', async (req, res) => {
    const listaDSUsuarios = await Gastrointestinales.find();

    if (listaDSUsuarios.length <= 0)
        return res.status(500).json({
            success: false,
            message:
                'No se encontro ninguna información gastrointestinal de los usuarios',
        });
    res.send(listaDSUsuarios);
});

router.get('/individual', async (req, res) => {
    try {
        const datosDeUsuario = await Gastrointestinales.find({
            usuario: req.query.usuario,
        });
        console.log(datosDeUsuario);
        if (!datosDeUsuario)
            return res.status(204).json({
                success: true,
                message: 'El usuario no tiene datos gastrointestinales todavia',
            });

        res.send(datosDeUsuario);
    } catch (err) {
        return res.status(500).json({
            success: true,
            message: 'Ocurrio un error al guardar los datos gastrointestinales',
        });
    }
});

router.post('/individual', async (req, res) => {
    try {
        const usuarioCreado = await Usuarios.findOne({
            usuario: req.query.usuario,
        });
        if (usuarioCreado) {
            const infoUsuario = await Gastrointestinales.findOne({
                usuario: req.query.usuario,
            });
            try {
                if (infoUsuario)
                    return res.status(500).json({
                        success: false,
                        message:
                            'Datos gastrointestinales de Usuario ya registrados',
                    });
            } catch (err) {
                return res.status(500).json({
                    success: false,
                    message:
                        'Ocurrió un error al buscar los datos gastrointestinales del usuario',
                });
            }
        } else console.log('El usuario no existe');
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Ocurrió un error al buscar al usuario',
        });
    }

    let dGastrointestinales = new Gastrointestinales({
        usuario: req.query.usuario,
        inflamacionAbdominal: req.body.inflamacionAbdominal,
        diarrea: req.body.diarrea,
        estreñimiento: req.body.estreñimiento,
        reflujo: req.body.reflujo,
    });

    try {
        dGastrointestinales = await dGastrointestinales.save();

        if (!dGastrointestinales)
            return res
                .status(400)
                .send('No se pudieron agregar datos gastrointestinales');
        res.send(dGastrointestinales);
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Ocurrió un error al guardar los datos gastrointestinales',
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
            editarInformacionS = await Gastrointestinales.findOneAndUpdate(
                { usuario: existeUsuario.usuario },
                {
                    $push:{
                        inflamacionAbdominal: req.body.inflamacionAbdominal,
                        diarrea: req.body.diarrea,
                        estreñimiento: req.body.estreñimiento,
                        reflujo: req.body.reflujo,
                    }
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
                    ' Ocurrió un error al actualizar los datos gastrointestinales- ',
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
