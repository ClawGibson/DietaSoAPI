const Usuarios = require("../models/Usuarios");
const IndicadoresBioquimicos = require("../../models/DatosExtrasUsuarios/IndicadoresBioquimicos");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { buscarUsuario } = require("../constants/index");

const buscarUsuarioo = async (id) => {
  try {
    const buscarUsuarioo = await Usuarios.find({
      usuario: id,
    });

    if (!buscarUsuarioo)
      return res.status(404).send({
        Error: "No se encontró el registro de informacion de usuario",
      });
    return buscarUsuarioo;
  } catch (error) {
    return res.status(500).json({
      error: `Error al buscar informacion de usuario - ${error}`,
    });
  }
};

router.get("/", async (req, res) => {
  const listaDSUsuarios = await IndicadoresBioquimicos.find();

  if (listaDSUsuarios.length <= 0)
    return res.status(500).json({
      success: false,
      message:
        "No se encontro ninguna información de indicadores bioquimicos de los usuarios",
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
      const datosDeUsuario = await IndicadoresBioquimicos.findOne({
        usuario: req.query.usuario,
      });
      console.log(datosDeUsuario);
      if (!datosDeUsuario)
        return res.status(500).json({
          success: true,
          message:
            "El usuario no tiene datos de indicadores bioquimicos todavia",
        });

      res.send(datosDeUsuario);
    } catch (err) {
      return res.status(500).json({
        success: true,
        message:
          "Ocurrio un error al guardar los datos de indicadores bioquimicos",
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
      const infoUsuario = await IndicadoresBioquimicos.findOne({
        usuario: req.query.usuario,
      });
      try {
        if (infoUsuario)
          return res.status(500).json({
            success: false,
            message:
              "Datos de indicadores bioquimicos de Usuario ya registrados",
          });
      } catch (err) {
        return res.status(500).json({
          success: false,
          message:
            "Ocurrió un error al buscar los datos de indicadores bioquimicos del usuario",
        });
      }
    } else console.log("El usuario no existe");
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Ocurrió un error al buscar al usuario",
    });
  }

  let dIndicadoresB = new IndicadoresBioquimicos({
    usuario: req.query.usuario,
    glucosaAyuno: req.body.glucosaAyuno,
    glucosaDespues: req.body.glucosaDespues,
    trigliceridos: req.body.trigliceridos,
    colesterolTotal: req.body.colesterolTotal,
    colesterolLDL: req.body.colesterolLDL,
    colesterolHDL: req.body.colesterolHDL,
    microbiotaIntestinal: req.body.microbiotaIntestinal,
  });

  try {
    dIndicadoresB = await dIndicadoresB.save();

    if (!dIndicadoresB)
      return res
        .status(400)
        .send("No se pudieron agregar datos de indicadores bioquimicos");
    res.send(dIndicadoresB);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message:
        "Ocurrió un error al guardar los datos de indicadores bioquimicos",
    });
  }
});

router.patch("/individual", async (req, res) => {
  try {
    const existeUsuario = await buscarUsuarioo(req.query.usuario);
    let editarInformacionS;
    if (!existeUsuario[0])
      return res
        .status(500)
        .json({ success: false, message: "El usuario no existe." });

    try {
      editarInformacionS = await IndicadoresBioquimicos.findOneAndUpdate(
        { usuario: existeUsuario[0].usuario },
        {
          glucosaAyuno: req.body.glucosaAyuno,
          glucosaDespues: req.body.glucosaDespues,
          trigliceridos: req.body.trigliceridos,
          colesterolTotal: req.body.colesterolTotal,
          colesterolLDL: req.body.colesterolLDL,
          colesterolHDL: req.body.colesterolHDL,
          microbiotaIntestinal: req.body.microbiotaIntestinal,
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
          " Ocurrió un error al actualizar los datos de indicadores bioquimicos- ",
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
