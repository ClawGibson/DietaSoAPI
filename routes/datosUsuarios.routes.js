const Usuarios = require("../models/Usuarios");
const DatosUsuarios = require("../models/DatosUsuarios");
const PuntosDeUsuario = require("../models/PuntosDeUsuario");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  const listaDatos = await DatosUsuarios.find();

  if (listaDatos.length <= 0 || !listaDatos)
    return res.status(500).json({
      success: false,
      message: "No se encontraron los datos de los usuarios",
    });
  res.send(listaDatos);
});

router.get("/:id", async (req, res) => {
  const usuarioCreado = await Usuarios.findOne({ usuario: req.query.usuario });
  console.log("entro al end", usuarioCreado);
  try {
    if (!usuarioCreado) {
      return res.status(500).json({
        success: false,
        message: "El usuario no existe",
      });
    } else console.log("El usuario existe");
  } catch (err) {
    console.log("Ocurrió un error al buscar el usuario - ", err);
  }

  try {
    const datosDeUsuario = await DatosUsuarios.findOne({
      usuario: req.query.usuario,
    }).select("peso altura actividadFisica");

    if (!datosDeUsuario.length > 0)
      return res.status(500).json({
        success: true,
        message: "El usuario no tiene datos todavia",
      });

    res.send(datosDeUsuario);
  } catch (err) {
    console.log("Ocurrió un error al obtener los datos- ", err);
  }
});

router.post("/:id", async (req, res) => {
  const usuarioCreado = await Usuarios.findOne({ usuario: req.query.usuario });
  console.log("entro al end", usuarioCreado);
  try {
    if (usuarioCreado) {
      const infoUsuario = await DatosUsuarios.findOne({
        usuario: req.query.usuario,
      });
      console.log("entro al try", infoUsuario);
      try {
        if (infoUsuario)
          return res.status(500).json({
            success: false,
            message: "Datos de Usuario ya registrados",
          });
      } catch (err) {
        console.log("Ocurrió un error al buscar el usuario - ", err);
      }
    } else console.log("El usuario no existe");
  } catch (err) {
    console.log("Ocurrió un error al buscar el usuario - ", err);
  }

  let datos = new DatosUsuarios({
    usuario: req.params.id,
    actividadFisica: req.body.actividadFisica,
    peso: req.body.peso,
    altura: req.body.altura,
  });

  try {
    datos = await datos.save();

    if (!datos)
      return res
        .status(400)
        .send("No se pudieron agregar los datos del usuario");
    res.send(datos);
  } catch (err) {
    console.log("Ocurrió un error al guardar los datos del usuario - ", err);
  }
});

router.patch("/:id", async (req, res) => {
  const existeUsuario = await Usuarios.findOne(req.query.usuario);

  if (!existeUsuario)
    return res
      .status(500)
      .json({ success: false, message: "El usuario no existe." });

  let editarInformacion;
  try {
    editarInformacion = await DatosUsuarios.findOneAndUpdate(req.params.id, {
      //peso: req.body.peso,
      altura: req.body.altura,
      actividadFisica: req.body.actividadFisica,
    });

    console.log("si", editarInformacion.peso.length);

    editarInformacion = editarInformacion
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
    console.log("Ocurrió un error al actualizar los datos del usuario - ", err);
  }
  var pesoNuevo = { peso: req.body.peso };
  console.log(pesoNuevo.peso);
  DatosUsuarios.findOneAndUpdate(
    { usuario: req.params.id },
    { $push: { peso: pesoNuevo.peso } },
    function (error, success) {
      if (error) {
        console.log(error);
      } else {
        //console.log(success);
      }
    }
  );
});

module.exports = router;
