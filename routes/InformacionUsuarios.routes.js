const Usuarios = require('../models/Usuarios');
const InformacionUsuarios = require('../models/InformacionUsuarios');
const PuntosDeUsuario = require('../models/PuntosDeUsuario');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//const buscarUsuario = require('../constants/index');

router.get('/:id', async (req, res) => {
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

  try {
    const nombre = await InformacionUsuarios.find({
      usuario: req.params.id,
    }).select('nombre');

    res.send(nombre);
  } catch (err) {
    console.log('Ocurrió un error al obtener los puntos - ', err);
  }
});

router.post('/:id', async (req, res) => {
  const buscarUsuario = async (id) => {
    try {
      const existeUsuario = await Usuarios.findById(id);

      if (existeUsuario)
        return res
          .status(500)
          .json({ success: false, message: 'El usuario ya existe.' });
    } catch (err) {
      console.log('Ocurrió un error al buscar el usuario - ', err);
    }
  };

  let informacion;
  informacion = new InformacionUsuarios({
    usuario: req.body.usuario,
    nombre: req.body.nombre,
    apellidoPaterno: req.body.apellidoPaterno,
    apellidoMaterno: req.body.apellidoMaterno,
    foto: req.body.foto,
    email: req.body.email,
    fechaDeNacimiento: req.body.fechaDeNacimiento,
    genero: req.body.genero,
    celular: req.body.celular,
    paisDeNacimiento: req.body.paisDeNacimiento,
    estadoDeNacimiento: req.body.estadoDeNacimiento,
    ciudadDeResidencia: req.body.ciudadDeResidencia,
    tiempoViviendoAhi: req.body.tiempoViviendoAhi,
  });

  try {
    const informacionGuardada = await informacion.save();

    if (!informacionGuardada)
      return res.status(400).send('No se pudo agregar el puntaje al usuario');
    res.send(informacionGuardada);
  } catch (err) {
    console.log('Ocurrió un error al guardar el puntaje del usuario - ', err);
  }
});

router.put('/:id', async (req, res) => {
  buscarUsuario(req.params.id);

  let editarInformacion;
  try {
    editarInformacion = await InformacionUsuarios.findOneAndUpdate(
      req.params.id,
      {
        usuario: req.body.usuario,
        nombre: req.body.nombre,
        apellidoPaterno: req.body.apellidos,
        apellidoMaterno: req.body.apellidos,
        foto: req.body.foto,
        email: req.body.email,
        fechaDeNacimiento: req.body.fechaDeNacimiento,
        genero: req.body.genero,
        celular: req.body.celular,
        paisDeNacimiento: req.body.paisDeNacimiento,
        estadoDeNacimiento: req.body.estadoDeNacimiento,
        ciudadDeResidencia: req.body.ciudadDeResidencia,
        tiempoViviendoAhi: req.body.tiempoViviendoAhi,
      }
    );

    editarInformacion = await editarInformacion.save();

    if (!editarInformacion)
      return res
        .status(500)
        .json({ success: false, message: 'No se pudo guardar - ', err });
    res.send(editarInformacion);
  } catch (err) {
    console.log('Ocurrió un error al actualizar los puntos - ', err);
  }
});

module.exports = router;
