const LogrosDeUsuario = require('../models/LogrosDeUsuario');
const Logros = require('../models/Logros');
const Usuarios = require('../models/Usuarios');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const listaLogros = await LogrosDeUsuario.find();

  if (listaLogros.length > 0 || !listaLogros)
    return res.status(500).json({
      success: false,
      message: 'No se encontraron logros de usuario',
    });
  res.send(listaLogros);
});

router.get('/:id', async (req, res) => {
  try {
    const usuarioExiste = await Usuarios.findById(req.params.id);

    if (!usuarioExiste)
      return res
        .status(500)
        .json({ success: false, message: 'El usuario no existe.' });
  } catch (err) {
    console.log('Error al buscar el usuario - ', err);
  }

  try {
    const listaLogros = await LogrosDeUsuario.find({
      usuario: req.params.id,
    })
      .populate('usuario logro', { nombre: 1, logro: 1 })
      .select('nombre logro');

    if (!listaLogros.length > 0)
      return res.status(500).json({
        success: true,
        message: 'El usuario no tiene logros todavía',
      });

    res.send(listaLogros);
  } catch (err) {
    console.log('Error al obtener los logros del usuario', err);
  }
});

router.post('/', async (req, res) => {
  let logroExiste;

  try {
    logroExiste = await Logros.findById(req.body.logro);

    if (!logroExiste)
      return res
        .status(500)
        .json({ succes: false, message: 'Este logro no existe' });
  } catch (err) {
    console.log('Ocurrió un error al buscar el logro', err);
  }

  let usuarioExiste;

  try {
    usuarioExiste = await Usuarios.findById(req.body.usuario);

    if (!usuarioExiste)
      return res
        .status(500)
        .json({ success: false, message: 'El usuario no existe' });
  } catch (err) {
    console.log('Ocurrió un error al buscar el usuario', err);
  }

  let logroDeUsuario = new LogrosDeUsuario({
    logro: req.body.logro,
    usuario: req.body.usuario,
  });

  try {
    logroDeUsuario = await logroDeUsuario.save();

    if (!logroDeUsuario)
      return res.status(400).send('No se pudo agregar el logro al usuario');
  } catch (err) {
    console.log('Ocurrió un error al guadar', err);
  }

  res.send(logroDeUsuario);
});

router.put('/:id', async (req, res) => {
  let logroExiste;

  try {
    logroExiste = await Logros.findById(req.body.logro);

    if (!logroExiste)
      return res
        .status(500)
        .json({ succes: false, message: 'Este logro no existe' });
  } catch (err) {
    console.log('Ocurrió un error al buscar el logro', err);
  }

  const { logro } = req.body;

  let listaLogros;

  try {
    listaLogros = await LogrosDeUsuario.find({
      usuario: req.params.id,
    });
    console.log('ListaLogros antes: ', listaLogros);
    listaLogros.map((item) => item.logro.push(logro));
    console.log('ListaLogros después:', listaLogros);
  } catch (err) {
    console.log('Error al actualizar los logros del usuario', err);
  }

  listaLogros = await listaLogros.save();

  !listaLogros
    ? res.status(400).send('No se pudo actualizar el logro al usuario')
    : res.send(listaLogros);
});

module.exports = router;
