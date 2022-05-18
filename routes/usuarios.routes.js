const Usuarios = require('../models/Usuarios');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const buscarUsuario = require('../constants');
const { sendEmail } = require('../config/mail.config');

router.get('/', async(req, res) => {
    let listaUsuarios;
    try {
        listaUsuarios = await Usuarios.find().select('-contrasena');
    } catch (error) {
        console.log(error);
    }

    if (!listaUsuarios) return res.status(500).json({ success: false, message: 'No se encontraron usuarios' });

    res.send(listaUsuarios);
});

router.get('/individual', async(req, res) => {
    const { usuario } = req.query;

    try {
        const user = await Usuarios.findById(usuario).select('-contrasena');

        if (!user) return res.status(500).json({ success: false, message: 'Usuario no encontrado' });
        res.status(200).send(user);
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Error al buscar el usuario ' });
    }
});

router.post('/', async(req, res) => {
    let crearUsuario = new Usuarios({
        usuario: req.body.usuario,
        email: req.body.email,
        contrasena: bcrypt.hashSync(req.body.contrasena, 10),
    });

    crearUsuario = await crearUsuario.save();
    console.log('2 usuario -> ', crearUsuario);

    if (!crearUsuario) return res.status(400).send('No se pudo crear el usuario :c');

    res.send(crearUsuario);
});

router.post('/login', async(req, res) => {
    console.log('1 usuario -> ', req.body);
    const usuario = await Usuarios.findOne({ email: req.body.email });
    const SECRET = process.env.SECRET;

    if (!usuario) {
        return res.status(404).json('Usuario no registrado :c');
    }

    if (usuario && bcrypt.compareSync(req.body.contrasena, usuario.contrasena)) {
        const token = jwt.sign({
                userId: usuario.id,
                isAdmin: usuario.esAdmin,
            },
            SECRET, { expiresIn: '1y' }
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

router.post('/register', async(req, res) => {
    try {
        const usuario = await Usuarios.findOne({ email: req.body.email });

        if (usuario) return res.status(302).send({ success: false, message: 'Usuario ya creado' });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Ocurrió un error al buscar el usuario',
        });
    }

    try {
        let registrarUsuario = new Usuarios({
            email: req.body.email,
            contrasena: bcrypt.hashSync(req.body.contrasena, 10),
        });
        console.log('Nuevo usuario -> ', registrarUsuario);
        registrarUsuario = await registrarUsuario.save();
        if (!registrarUsuario) return res.status(400).send('No se pudo agregar al usuario');

        const buscarIdUsuario = await Usuarios.find({
            email: req.body.email,
        });
        console.log('Buscando 2:', buscarIdUsuario);
        registrarUsuario.usuario = buscarIdUsuario[0].id;

        registrarUsuario = await registrarUsuario.save();
        console.log('3: ', registrarUsuario);

        if (!registrarUsuario) return res.status(400).send('No se pudo agregar al usuario');

        res.status(200).send(registrarUsuario); // Antes de hacer este send, enviar la confirmacion del correo
    } catch (err) {
        console.log('Ocurrió un error al guardar usuario - ', err);
        return res.status(500).send({
            message: 'Ocurrió un error al registrar el usuario',
            error: err,
        });
    }
});

router.post('/register/admin', async(req, res) => {
    const { name, email, contrasena } = req.body;
    try {
        const usuario = await Usuarios.findOne({ email: req.body.email });
        console.log('Buscando', usuario);
        if (usuario)
            return res
                .status(302)
                .send({ success: false, message: 'Usuario ya creado' });
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
    console.log('Nuevo usuario -> ', registrarUsuario);
    try {
        registrarUsuario = await registrarUsuario.save();
        if (!registrarUsuario)
            return res.status(400).send('No se pudo agregar al usuario');
        const buscarIdUsuario = await Usuarios.find({
            email: req.body.email,
        });
        console.log('Buscando 2:', buscarIdUsuario);
        registrarUsuario.usuario = buscarIdUsuario[0].id;

        registrarUsuario = await registrarUsuario.save();
        console.log('3: ', registrarUsuario);
        if (!registrarUsuario)
            return res.status(400).send('No se pudo agregar al usuario');

        /**Envio del correo de verificacion */
        await sendEmail(name, email, registrarUsuario.usuario, "Este es un email de prueba");

        res.send(registrarUsuario); // Antes de hacer este send, enviar la confirmacion del correo
    } catch (err) {
        console.log('Ocurrió un error al guardar usuario - ', err);
        return res.status(500).send({
            message: 'Ocurrió un error al registrar el usuario',
            error: err,
        });
    }

});

/**Metodo get para obtener la verificacion */
router.get('/verificar-email', async(req, res) => {
    /**Obtenemos el token de URL */
    const token = req.query.token
    console.log(token);
    const user = await Usuarios.findOne({ usuario: token })
    if (user) {
        user.isAdmin = true;
        await user.save();
        res.send("Ahora es admin");
    } else {
        res.send("Hubo un error");
    }
    console.log('Correo verificado');
    res.status(200).send({ Mensaje: "OK" });
});


router.put('/individual', async(req, res) => {
    try {
        const usuario = await Usuarios.findOne({ usuario: req.query.usuario });

        if (!usuario) return res.status(500).json({ success: false, message: 'Usuario no existe' });

        console.log(usuario);
        let editarUsuario = await Usuarios.findOneAndUpdate({ usuario: usuario.usuario }, {
            email: req.body.email,
            contrasena: bcrypt.hashSync(req.body.contrasena, 10),
        });
        console.log(editarUsuario);
        editarUsuario = await editarUsuario.save();

        if (!editarUsuario) return res.status(400).send('No se pudo editar el usuario :c');

        res.send('ok');
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Ocurrió un error al buscar el usuario',
        });
    }
});
module.exports = router;