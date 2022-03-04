const Usuarios = require('../models/Usuarios');
const InformacionUsuarios = require('../models/InformacionUsuarios');

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { buscarUsuario } = require('../constants/index');

router.get('/', async (req, res) => {
    try {
        const listaIUsuarios = await InformacionUsuarios.find();

        if (listaIUsuarios.length <= 0)
            return res.status(404).json({
                success: false,
                message: 'No se encontro ninguna información de usuarios',
            });
        res.send(listaIUsuarios);
    } catch (err) {
        console.log(`Error - ${err}`);
        return res.status(500).json({
            success: false,
            message:
                'Ocurrió un error al buscar la información de los usuarios',
        });
    }
});

router.get('/individual', async (req, res) => {
    try {
        const { _id } = await buscarUsuario(req.query.usuario);

        if (!_id)
            return res
                .status(404)
                .send({ Error: 'No se encontró el usuario proporcionado' });

        const listaInfoUsuarios = await InformacionUsuarios.find({
            usuario: mongoose.Types.ObjectId(_id),
        });

        if (!listaInfoUsuarios || listaInfoUsuarios.length === 0)
            return res.status(204).send({
                message: 'El usuario no tiene información',
            });

        res.send(listaInfoUsuarios[0]);
    } catch (err) {
        console.log(`Error - ${err}`);
        return res.status(500).json({
            success: false,
            message: 'El usuario no existe',
        });
    }
});

router.post('/individual', async (req, res) => {
    const { usuario } = req.query;

    let informacion = new InformacionUsuarios({
        usuario: usuario,
        ...req.body,
    });

    try {
        informacion = await informacion.save();

        if (!informacion)
            return res
                .status(400)
                .send('No se pudo agregar la información al usuario');
        res.send(informacion);
    } catch (err) {
        console.log(`Error - ${err}`);
        return res
            .status(400)
            .send('Ocurrió un error al guardar información de usuario');
    }
});

router.patch('/individual', async (req, res) => {
    try {
        const { usuario } = req.query;
        let editarUsuario = await InformacionUsuarios.findOneAndUpdate(
            { usuario: usuario },
            { ...req.body },
            { new: true }
        );

        if (editarUsuario) {
            editarUsuario = editarUsuario
                .save()
                .then((response) => res.status(200).json({ message: 'ok' }))
                .catch((err) =>
                    res.status(500).json({
                        success: false,
                        message: 'No se pudo guardar la nueva información - ',
                        err,
                    })
                );
        } else {
            return res
                .status(404)
                .json({ success: false, message: 'No se pudo guardar' });
        }
    } catch (err) {
        console.log(`Error - ${err}`);
        res.status(500).json({
            success: false,
            message: 'Ocurrió un error al actualizar informacion de usuario- ',
            err,
        });
    }
});

module.exports = router;
