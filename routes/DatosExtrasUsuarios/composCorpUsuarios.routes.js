const Usuarios = require('../../models/Usuarios');
const ComposCorpUsuarios = require('../../models/DatosExtrasUsuarios/ComposCorpUsuarios');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { buscarUsuario } = require('../../constants/index');

router.get('/', async (req, res) => {
    const listaDSUsuarios = await ComposCorpUsuarios.find();

    if (listaDSUsuarios.length <= 0)
        return res.status(500).json({
            success: false,
            message:
                'No se encontro ninguna información de composición corporal de los usuarios',
        });
    res.send(listaDSUsuarios);
});

router.get('/individual', async (req, res) => {
    try {
        const datosDeUsuario = await ComposCorpUsuarios.find({
            usuario: req.query.usuario,
        });
        console.log(datosDeUsuario);
        if (!datosDeUsuario)
            return res.status(204).send({
                success: true,
                message:
                    'El usuario no tiene datos de composición corporal todavia',
            });

        res.status(200).send(datosDeUsuario);
    } catch (err) {
        return res.status(500).json({
            success: true,
            message:
                'Ocurrio un error al guardar los datos de composición corporal',
        });
    }
});

router.post('/individual', async (req, res) => {
    try {
        const usuarioCreado = await Usuarios.findOne({
            usuario: req.query.usuario,
        });
        if (usuarioCreado) {
            const infoUsuario = await ComposCorpUsuarios.findOne({
                usuario: req.query.usuario,
            });
            try {
                if (infoUsuario)
                    return res.status(500).json({
                        success: false,
                        message:
                            'Datos de composición corporal de Usuario ya registrados',
                    });
            } catch (err) {
                return res.status(500).json({
                    success: false,
                    message:
                        'Ocurrió un error al buscar los datos de composición corporal del usuario',
                });
            }
        } else console.log('El usuario no existe');
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Ocurrió un error al buscar al usuario',
        });
    }

    let dComposCorp = new ComposCorpUsuarios({
        usuario: req.query.usuario,
        porcentGrasa: req.body.porcentGrasa,
        porcentMasa: req.body.porcentMasa,
        porcentAgua: req.body.porcentAgua,
        densidadOsea: req.body.densidadOsea,
        grasaVisceral: req.body.grasaVisceral,
        tasaMetabolica: req.body.tasaMetabolica,
        edadMetabolica: req.body.edadMetabolica,
    });

    try {
        dComposCorp = await dComposCorp.save();

        if (!dComposCorp)
            return res
                .status(400)
                .send('No se pudieron agregar datos de composición corporal');
        res.send(dComposCorp);
    } catch (err) {
        return res.status(500).json({
            success: false,
            message:
                'Ocurrió un error al guardar los datos de composición corporal',
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
            editarInformacionS = await ComposCorpUsuarios.findOneAndUpdate(
                { usuario: existeUsuario.usuario },
                {
                    porcentGrasa: req.body.porcentGrasa,
                    porcentMasa: req.body.porcentMasa,
                    porcentAgua: req.body.porcentAgua,
                    densidadOsea: req.body.densidadOsea,
                    grasaVisceral: req.body.grasaVisceral,
                    tasaMetabolica: req.body.tasaMetabolica,
                    edadMetabolica: req.body.edadMetabolica,
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
                    ' Ocurrió un error al actualizar los datos de composición corporal- ',
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
