const Usuarios = require("../models/Usuarios");
const DatosSocioeconomicos = require("../models/DatosSocioeconomicos");
const PuntosDeUsuario = require("../models/PuntosDeUsuario");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
//const buscarUsuario = require('../constants/index');

router.get("/", async (req, res) => {
  const listaDSUsuarios = await DatosSocioeconomicos.find();

  if (listaDSUsuarios.length <= 0)
    return res.status(500).json({
      success: false,
      message: "No se encontro ninguna informacion de usuarios",
    });
  res.send(listaDSUsuarios);
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
    const nivelSocioeconomico = await DatosSocioeconomicos.find({
      usuario: req.params.id,
    }).select("nivelSocioeconomico");

    res.send(nivelSocioeconomico);
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

  let dSocioeconomicos;
  dSocioeconomicos = new DatosSocioeconomicos({
    usuario: req.body.usuario,
    nivelSocioeconomico: req.body.nivelSocioeconomico,
  });

  try {
    const informacionGuardada = await dSocioeconomicos.save();

    if (!informacionGuardada)
      return res
        .status(400)
        .send("No se pudo agregar el historial clinico del usuario");
    res.send(informacionGuardada);
  } catch (err) {
    console.log(
      "Ocurrió un error al guardar el historial clinico del usuario - ",
      err
    );
  }
});

router.put("/:id", async (req, res) => {
  buscarUsuario(req.params.id);

  let editarInformacionS;
  try {
    editarInformacionS = await DatosSocioeconomicos.findOneAndUpdate(
      req.params.id,
      {
        usuario: req.body.usuario,
        nivelSocioeconomico: req.body.nivelSocioeconomico,
      }
    );

    editarInformacionS = await editarInformacionS.save();

    if (!editarInformacionS)
      return res
        .status(500)
        .json({ success: false, message: "No se pudo guardar - ", err });
    res.send(editarInformacionS);
  } catch (err) {
    console.log("Ocurrió un error al actualizar el historial clinico - ", err);
  }
});

module.exports = router;
