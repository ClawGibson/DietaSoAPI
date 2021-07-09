const Usuarios = require('../models/Usuarios');
const PuntosDeUsuario = require('../models/PuntosDeUsuario');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const buscarUsuario = async (id) => {
  try {
    const existeUsuario = await Usuarios.findById(id);

    if (!existeUsuario)
      return res
        .status(500)
        .json({ success: false, message: 'El usuario no existe.' });
  } catch (err) {
    console.log('Ocurrió un error al buscar el usuario - ', err);
  }
};

router.get('/:id', async (req, res) => {
  buscarUsuario(req.params.id);

  try {
    const puntos = await PuntosDeUsuario.find({
      usuario: req.params.id,
    }).select('puntos');

    res.send(puntos);
  } catch (err) {
    console.log('Ocurrió un error al obtener los puntos - ', err);
  }
});

router.post('/:id', async (req, res) => {
  buscarUsuario(req.params.id);

  let puntos;
  try {
    puntos = new PuntosDeUsuario({
      usuario: req.body.usuario,
      puntos: req.body.puntos,
    });
  } catch (err) {
    console.log('Ocurrió un error al insertar los puntos :c', err);
  }

  try {
    const puntosGuardados = await puntos.save();

    if (!puntosGuardados)
      return res.status(400).send('No se pudo agregar el puntaje al usuario');
    res.send(puntosGuardados);
  } catch (err) {
    console.log('Ocurrió un error al guardar el puntaje del usuario - ', err);
  }
});

router.put('/:id', async (req, res) => {
  buscarUsuario(req.params.id);

  let nuevo;
  try {
    nuevo = await PuntosDeUsuario.find({ usuario: req.params.id });

    nuevo[0].puntos = req.body.puntos;

    nuevo = await nuevo[0].save();

    if (!nuevo)
      return res
        .status(500)
        .json({ success: false, message: 'No se pudo guardar - ', err });
    res.send(nuevo);
  } catch (err) {
    console.log('Ocurrió un error al actualizar los puntos - ', err);
  }
});

module.exports = router;
