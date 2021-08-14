const Usuarios = require("../models/Usuarios");
const DatosSocioeconomicos = require("../models/DatosSocioeconomicos");
const PuntosDeUsuario = require("../models/PuntosDeUsuario");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  const listaDSUsuarios = await DatosSocioeconomicos.find();

  if (listaDSUsuarios.length <= 0)
    return res.status(500).json({
      success: false,
      message:
        "No se encontro ninguna informacion de datos socioeconomicos de los usuarios",
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

    if (!nivelSocioeconomico.length > 0)
      return res.status(500).json({
        success: true,
        message: "El usuario no tiene datos socioeconomicos todavia",
      });

    res.send(nivelSocioeconomico);
  } catch (err) {
    console.log(
      "Ocurrió un error al obtener los datos socioeconomicos - ",
      err
    );
  }
});

router.post("/:id", async (req, res) => {
  const usuarioCreado = await Usuarios.findOne({ usuario: req.params.id });
  try {
    if (usuarioCreado) {
      const infoUsuario = await DatosSocioeconomicos.findOne({
        usuario: req.params.id,
      });
      try {
        if (infoUsuario)
          return res.status(500).json({
            success: false,
            message: "Datos socioeconomicos de Usuario ya registrados",
          });
      } catch (err) {
        console.log("Ocurrió un error al buscar el usuario - ", err);
      }
    } else console.log("El usuario no existe");
  } catch (err) {
    console.log("Ocurrió un error al buscar el usuario - ", err);
  }

  let dSocioeconomicos = new DatosSocioeconomicos({
    usuario: req.params.id,
    nivelSocioeconomico: req.body.nivelSocioeconomico,
  });

  try {
    dSocioeconomicos = await dSocioeconomicos.save();

    if (!dSocioeconomicos)
      return res
        .status(400)
        .send("No se pudieron agregar datos socioeconomicos");
    res.send(dSocioeconomicos);
  } catch (err) {
    console.log(
      "Ocurrió un error al guardar los datos socioeconomicos - ",
      err
    );
  }
});

router.patch("/:id", async (req, res) => {
  const existeUsuario = await Usuarios.findById(req.params.id);

  if (!existeUsuario)
    return res
      .status(500)
      .json({ success: false, message: "El usuario no existe." });

  let editarInformacionS;
  try {
    editarInformacionS = await DatosSocioeconomicos.findOneAndUpdate(
      req.params.id,
      {
        nivelSocioeconomico: req.body.nivelSocioeconomico,
      }
    );

    editarInformacionS = editarInformacionS
      .save()
      .then((response) => res.status(200).json({ message: "ok" }))
      .catch((err) =>
        res.status(500).json({
          success: false,
          message: "No se pudo guardar - ",
          err,
        })
      );
  } catch (err) {
    console.log(
      "Ocurrió un error al actualizar los datos socioeconomicos- ",
      err
    );
  }
});

module.exports = router;
