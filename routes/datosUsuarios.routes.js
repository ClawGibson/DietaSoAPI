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
        const datosDeUsuario = await DatosUsuarios.findOne({
            usuario: req.query.usuario,
        }).select('peso altura actividadFisica');
        console.log(datosDeUsuario);
        if (!datosDeUsuario)
            return res.status(204).json({
                success: true,
                message: 'El usuario no tiene datos todavia',
            });

        res.send(datosDeUsuario);
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
    //const existeUsuario = await Usuarios.findOne(req.query.usuario);
    try {
        const existeUsuario = await buscarUsuario(req.query.usuario);
        let editarInformacion;
        console.log(existeUsuario);
        if (!existeUsuario) {
            return res
                .status(500)
                .json({ success: false, message: 'Usuario No existe' });
            //console.log("entra al if");
        } //else console.log("no entro al if", existeUsuario);

        try {
            editarInformacion = await DatosUsuarios.findOneAndUpdate(
                {
                    usuario: existeUsuario.usuario,
                },
                {
                    //peso: req.body.peso,,
                    altura: req.body.altura,
                    actividadFisica: req.body.actividadFisica,
                }
            );

            //console.log("si", editarInformacion);

            editarInformacion = editarInformacion
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
                    'Ocurrió un error al actualizar los datos del usuario - ',
            });
        }
        var pesoNuevo = { peso: req.body.peso };
        //let existeUsuario1 = await DatosUsuarios.findOne(req.query.usuario);

        //console.log(pesoNuevo.peso);
        //console.log("nuebos", editarInformacion);
        DatosUsuarios.findOneAndUpdate(
            { usuario: req.query.usuario },
            { $push: { peso: pesoNuevo.peso } },
            function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    //console.log(success);
                }
            }
        );
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'No se encontro usuario - ',
            err,
        });
    }
});

module.exports = router;
