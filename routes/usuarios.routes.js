const Usuarios = require('../models/Usuarios');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const buscarUsuario = require('../constants');

router.get('/', async (req, res) => {
    let listaUsuarios;
    try {
        listaUsuarios = await Usuarios.find().select('-contrasena');
    } catch (error) {
        console.log(error);
    }

    if (!listaUsuarios)
        return res
            .status(500)
            .json({ success: false, message: 'No se encontraron usuarios' });

    res.send(listaUsuarios);
});

router.get('/individual', async (req, res) => {
    //const usuario = await buscarUsuario(req.params.id);
    //constantes.buscarUsuario(req.params.id);

    try {
        const usuario = await Usuarios.findById(req.query.usuario).select(
            '-contrasena'
        );
        //console.log(usuario);
        if (!usuario)
            return res
                .status(500)
                .json({ success: false, message: 'Usuario no encontrado' });
        res.send(usuario);
    } catch (err) {
        return res
            .status(500)
            .json({ success: false, message: 'Error al buscar el usuario ' });
    }
});

router.post('/', async (req, res) => {
    let crearUsuario = new Usuarios({
        usuario: req.body.usuario,
        email: req.body.email,
        contrasena: bcrypt.hashSync(req.body.contrasena, 10),
    });

    crearUsuario = await crearUsuario.save();
    console.log('2 usuario -> ', crearUsuario);

    if (!crearUsuario)
        return res.status(400).send('No se pudo crear el usuario :c');

    res.send(crearUsuario);
});

router.post('/login', async (req, res) => {
    const usuario = await Usuarios.findOne({ email: req.body.email });
    const SECRET = process.env.SECRET;

    if (!usuario) {
        return res.status(404).json('Usuario no registrado :c');
    }

    if (
        usuario &&
        bcrypt.compareSync(req.body.contrasena, usuario.contrasena)
    ) {
        const token = jwt.sign(
            {
                userId: usuario.id,
                isAdmin: usuario.esAdmin,
            },
            SECRET,
            { expiresIn: '1y' }
        );

        res.status(200).send({
            usuario: usuario.email,
            token: token,
            admin: usuario.esAdmin,
            id: usuario._id,
        });
    } else {
        res.status(401).json('Contraseña incorrecta');
    }
});

router.post('/register', async (req, res) => {
    try {
        const usuario = await Usuarios.findOne({ email: req.body.email });
        if (usuario)
            return res
                .status(500)
                .json({ success: false, message: 'Usuario ya creado' });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Ocurrió un error al buscar el usuario',
        });
    }

    let registrarUsuario = new Usuarios({
        usuario: req.body.usuario,
        email: req.body.email,
        contrasena: bcrypt.hashSync(req.body.contrasena, 10),
    });

    try {
        registrarUsuario = await registrarUsuario.save();
        if (!registrarUsuario)
            return res.status(400).send('No se pudo agregar al usuario');
        const buscarIdUsuario = await Usuarios.find({
            email: req.body.email,
        });

        registrarUsuario.usuario = buscarIdUsuario[0].id;

        registrarUsuario = await registrarUsuario.save();

        if (!registrarUsuario)
            return res.status(400).send('No se pudo agregar al usuario');

        res.send(registrarUsuario);
    } catch (err) {
        console.log('Ocurrió un error al guardar usuario - ', err);
    }
});

router.put('/individual', async (req, res) => {
    try {
        const usuario = await Usuarios.findOne({ usuario: req.query.usuario });

        if (!usuario)
            return res
                .status(500)
                .json({ success: false, message: 'Usuario no existe' });

        console.log(usuario);
        let editarUsuario = await Usuarios.findOneAndUpdate(
            { usuario: usuario.usuario },
            {
                email: req.body.email,
                contrasena: bcrypt.hashSync(req.body.contrasena, 10),
            }
        );
        console.log(editarUsuario);
        editarUsuario = await editarUsuario.save();

        if (!editarUsuario)
            return res.status(400).send('No se pudo editar el usuario :c');

        res.send('ok');
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Ocurrió un error al buscar el usuario',
        });
    }
});
module.exports = router;
