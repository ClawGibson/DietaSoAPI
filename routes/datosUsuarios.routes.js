const Usuarios = require('../models/Usuarios');
const DatosUsuarios = require('../models/DatosUsuarios');
const PuntosDeUsuario = require('../models/PuntosDeUsuario');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { buscarUsuario } = require('../constants/index');

router.get('/', async (req, res) => {
    const listaDatos = await DatosUsuarios.find();

    if (listaDatos.length <= 0 || !listaDatos)
        return res.status(500).json({
            success: false,
            message: 'No se encontraron los datos de los usuarios',
        });
    res.send(listaDatos);
});

router.get('/individual', async (req, res) => {
    try {
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
            return res.status(500).json({
                success: true,
                message: 'Ocurrio un error al buscar los datos del usuario',
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: true,
            message: 'Ocurrio un error al buscar al usuario',
        });
    }
});

router.post('/individual', async (req, res) => {
    /* try {
      const usuarioCreado = await Usuarios.findById(req.query.usuario);
      
        if (usuarioCreado) {
            try {
                const infoUsuario = await DatosUsuarios.findOne({
                    usuario: req.query.usuario,
                });

                if (infoUsuario) {
                    console.log('entro al if', infoUsuario);
                    return res.status(404).json({
                        success: false,
                        message: 'Datos de Usuario ya registrados',
                    });
                } else console.log('no existe', infoUsuario);
            } catch (err) {
                //console.log("Ocurrió un error al buscar el usuario - ", err);
                return res.status(500).json({
                    success: false,
                    message: 'Ocurrió un error al buscar datos del usuario',
                });
            }
        } else console.log('El usuario no existe');
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Ocurrió un error al buscar el usuario',
        });
    } */

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
