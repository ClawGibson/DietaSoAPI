const Usuarios = require("../models/Usuarios");
const HistorialClinico = require("../models/HistorialClinico");
const PuntosDeUsuario = require("../models/PuntosDeUsuario");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  const listaHMUsuarios = await HistorialClinico.find();

  if (listaHMUsuarios.length <= 0)
    return res.status(500).json({
      success: false,
      message: "No se encontro ningun historial clinico de usuarios",
    });
  res.send(listaHMUsuarios);
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
    const historiaClinica = await HistorialClinico.find({
      usuario: req.params.id,
    }).select("historiaClinica");

    if (!historiaClinica.length > 0)
      return res.status(500).json({
        success: true,
        message: "El usuario no tiene historial clinico registrado",
      });

    res.send(historiaClinica);
  } catch (err) {
    console.log("Ocurrió un error al obtener el historial clinico - ", err);
  }
});

router.post("/:id", async (req, res) => {
  const usuarioCreado = await Usuarios.findOne({ usuario: req.params.id });
  try {
    if (usuarioCreado) {
      const infoUsuario = await HistorialClinico.findOne({
        usuario: req.params.id,
      });
      try {
        if (infoUsuario)
          return res.status(500).json({
            success: false,
            message: "Historial clinico de Usuario ya creado",
          });
      } catch (err) {
        console.log("Ocurrió un error al buscar el usuario - ", err);
      }
    } else console.log("El usuario no existe");
  } catch (err) {
    console.log("Ocurrió un error al buscar el usuario - ", err);
  }

  let informacionCli = new HistorialClinico({
    usuario: req.params.id,
    historiaClinica: req.body.historiaClinica,
  });

  try {
    informacionCli = await informacionCli.save();

    if (!informacionCli)
      return res.status(400).send("No se pudo agregar historial clinico");
    res.send(informacionCli);
  } catch (err) {
    console.log("Ocurrió un error al guardar el historial clinico - ", err);
  }
});

router.patch("/:id", async (req, res) => {
  const existeUsuario = await Usuarios.findById(req.params.id);

  if (!existeUsuario)
    return res
      .status(500)
      .json({ success: false, message: "El usuario no existe." });

  let editarInformacionCli;
  try {
    editarInformacionCli = await HistorialClinico.findOneAndUpdate(
      req.params.id,
      {
        historiaClinica: req.body.historiaClinica,
      }
    );

    editarInformacionCli = editarInformacionCli
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
    console.log("Ocurrió un error al actualizar el historial clinico - ", err);
  }
});

module.exports = router;
