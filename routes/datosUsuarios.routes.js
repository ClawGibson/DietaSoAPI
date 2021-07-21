const Usuarios = require("../models/Usuarios");
const DatosUsuarios = require("../models/DatosUsuarios");
const PuntosDeUsuario = require("../models/PuntosDeUsuario");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
//const buscarUsuario = require('../constants/index');

router.get("/", async (req, res) => {
  const listaDatos = await DatosUsuarios.find();

  if (listaDatos.length <= 0 || !listaDatos)
    return res.status(500).json({
      success: false,
      message: "No se encontraron logros de usuario",
    });
  res.send(listaDatos);
});

router.get("/:id", async (req, res) => {
  const buscarUsuario = async (id) => {
    try {
      const existeUsuario = await Usuarios.findById(id);

      if (!existeUsuario)
        return res
          .status(500)
          .json({ success: false, message: "El usuario no existe." });
    } catch (err) {
      console.log("Ocurrió un error al buscar el usuario - ", err);
    }
  };

  try {
    const peso = await DatosUsuarios.find({
      usuario: req.params.id,
    }).select("peso");

    res.send(peso);
  } catch (err) {
    console.log("Ocurrió un error al obtener los puntos - ", err);
  }
});

router.post("/:id", async (req, res) => {
  const buscarUsuario = async (id) => {
    try {
      const existeUsuario = await Usuarios.findById(id);

      if (existeUsuario)
        return res
          .status(500)
          .json({ success: false, message: "El usuario ya existe." });
    } catch (err) {
      console.log("Ocurrió un error al buscar el usuario - ", err);
    }
  };

  let datos;
  datos = new DatosUsuarios({
    usuario: req.body.usuario,
    peso: req.body.peso,
    altura: req.body.altura,
    actividadFisica: req.body.actividadFisica,
  });

  try {
    const informacionGuardada = await datos.save();

    if (!informacionGuardada)
      return res.status(400).send("No se pudo agregar el puntaje al usuario");
    res.send(informacionGuardada);
  } catch (err) {
    console.log("Ocurrió un error al guardar el puntaje del usuario - ", err);
  }
});

router.put("/:id", async (req, res) => {
  buscarUsuario(req.params.id);

  let editarInformacion;
  try {
    editarInformacion = await DatosUsuarios.findOneAndUpdate(req.params.id, {
      usuario: req.body.usuario,
      peso: req.body.peso,
      altura: req.body.altura,
      actividadFisica: req.body.actividadFisica,
    });

    editarInformacion = await editarInformacion.save();

    if (!editarInformacion)
      return res
        .status(500)
        .json({ success: false, message: "No se pudo guardar - ", err });
    res.send(editarInformacion);
  } catch (err) {
    console.log("Ocurrió un error al actualizar los puntos - ", err);
  }
});

module.exports = router;
