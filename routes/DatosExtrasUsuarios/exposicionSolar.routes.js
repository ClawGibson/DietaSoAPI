const Usuarios = require("../models/Usuarios");
const ExposicionSolar = require("../../models/DatosExtrasUsuarios/ExposicionSolar");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { buscarUsuario } = require("../../constants/index");

router.get("/", async (req, res) => {
  const listaDSUsuarios = await ExposicionSolar.find();

  if (listaDSUsuarios.length <= 0)
    return res.status(500).json({
      success: false,
      message:
        "No se encontro ninguna información de exposicion solar de los usuarios",
    });
  res.send(listaDSUsuarios);
});

router.get("/individual", async (req, res) => {
  try {
    const usuarioCreado = await buscarUsuario(req.query.usuario);
    console.log(usuarioCreado);

    if (!usuarioCreado) {
      return res.status(500).json({
        success: false,
        message: "El usuario no existe",
      });
    } else console.log("El usuario existe");

    try {
      const datosDeUsuario = await ExposicionSolar.findOne({
        usuario: req.query.usuario,
      });
      console.log(datosDeUsuario);
      if (!datosDeUsuario)
        return res.status(500).json({
          success: true,
          message: "El usuario no tiene datos de exposicion solar todavia",
        });

      res.send(datosDeUsuario);
    } catch (err) {
      return res.status(500).json({
        success: true,
        message: "Ocurrio un error al guardar los datos de exposicion solar",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: true,
      message: "Ocurrio un error al buscar usuario",
    });
  }
});

router.post("/individual", async (req, res) => {
  try {
    const usuarioCreado = await Usuarios.findOne({
      usuario: req.query.usuario,
    });
    if (usuarioCreado) {
      const infoUsuario = await ExposicionSolar.findOne({
        usuario: req.query.usuario,
      });
      try {
        if (infoUsuario)
          return res.status(500).json({
            success: false,
            message: "Datos de exposicion solar de Usuario ya registrados",
          });
      } catch (err) {
        return res.status(500).json({
          success: false,
          message:
            "Ocurrió un error al buscar los datos de exposicion solar del usuario",
        });
      }
    } else console.log("El usuario no existe");
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Ocurrió un error al buscar al usuario",
    });
  }

  let dExposicionSolar = new ExposicionSolar({
    usuario: req.query.usuario,
    minutosAlSol: req.body.minutosAlSol,
    cubresTuPiel: req.body.cubresTuPiel,
    bloqueadorSolar: req.body.bloqueadorSolar,
    diasXsemana: req.body.diasXsemana,
  });

  try {
    dExposicionSolar = await dExposicionSolar.save();

    if (!dExposicionSolar)
      return res
        .status(400)
        .send("No se pudieron agregar datos de exposición solar");
    res.send(dExposicionSolar);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Ocurrió un error al guardar los datos de exposición solar",
    });
  }
});

router.patch("/individual", async (req, res) => {
  try {
    const existeUsuario = await buscarUsuario(req.query.usuario);
    let editarInformacionS;
    if (!existeUsuario)
      return res
        .status(500)
        .json({ success: false, message: "El usuario no existe." });

    try {
      editarInformacionS = await ExposicionSolar.findOneAndUpdate(
        { usuario: existeUsuario.usuario },
        {
          minutosAlSol: req.body.minutosAlSol,
          cubresTuPiel: req.body.cubresTuPiel,
          bloqueadorSolar: req.body.bloqueadorSolar,
          diasXsemana: req.body.diasXsemana,
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
      res.status(500).json({
        success: false,
        message:
          " Ocurrió un error al actualizar los datos de exposición solar- ",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: " Ocurrió un error al buscar el usuario- ",
    });
  }
});

module.exports = router;
