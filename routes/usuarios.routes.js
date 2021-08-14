const { Usuarios } = require('../models/Usuarios');
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

router.get('/:id', async (req, res) => {



  const usuario = await buscarUsuario(req.params.id);
  // constantes.buscarUsuario(req.params.id);


  // const usuario = await Usuarios.findById(req.params.id).select('-contrasena');

  if (!usuario)
    return res
      .status(500)
      .json({ success: false, message: 'Usuario no encontrado' });
  res.send(usuario);


});

router.post('/', async (req, res) => {
  let crearUsuario = new Usuarios({
    logros: req.body.logros,

    email: req.body.email,

    contrasena: bcrypt.hashSync(req.body.contrasena, 10),

    tipoDeUsuario: req.body.tipoDeUsuario,
  });

  crearUsuario = await crearUsuario.save();

  if (!crearUsuario)
    return res.status(400).send('No se pudo crear el usuario :c');

  res.send(crearUsuario);
});

router.post('/login', async (req, res) => {
  const usuario = await Usuarios.findOne({ email: req.body.email });
  const SECRET = process.env.SECRET;

  if (!usuario) {
    return res.status(400).send('Usuario no registrado :c');
  }

  if (usuario && bcrypt.compareSync(req.body.contrasena, usuario.contrasena)) {
    const token = jwt.sign(
      {
        userId: usuario.id,
        isAdmin: usuario.esAdmin,
      },
      SECRET,
      { expiresIn: '1y' }
    );
    res.status(200).send({ usuario: usuario.email, token: token });
  } else {
    res.status(400).send('Contraseña incorrecta');
  }
});

router.post('/register', async (req, res) => {
  const usuario = await Usuarios.findOne({ email: req.body.email });
  try {
    if (usuario)
      return res
        .status(500)
        .json({ success: false, message: 'Usuario ya creado' });
  } catch (err) {
    console.log('Ocurrió un error al buscar el usuario - ', err);
  }
  try {
    let registrarUsuario = new Usuarios({

      email: req.body.email,

      contrasena: bcrypt.hashSync(req.body.contrasena, 10),

      tipoDeUsuario: req.body.tipoDeUsuario,
    });

    registrarUsuario = await registrarUsuario.save();

    if (!registrarUsuario)
      return res.status(400).send('No se pudo agregar al usuario');
    res.send(registrarUsuario);
  } catch (err) {
    console.log('Ocurrió un error al guardar usuario - ', err);
  }
});

router.put('/:id', async (req, res) => {
  let editarUsuario = await Usuarios.findOneAndUpdate(req.params.id, {
    logros: req.body.logros,

    email: req.body.email,

    contrasena: bcrypt.hashSync(req.body.contrasena, 10),

    tipoDeUsuario: req.body.tipoDeUsuario,
  });

  editarUsuario = await editarUsuario.save();

  if (!editarUsuario)
    return res.status(400).send('No se pudo editar el usuario :c');

  res.send(editarUsuario);
});
module.exports = router;
