const Usuarios = require("../models/Usuarios");
const AlimentacionUsuarios = require("../models/AlimentacionUsuarios");
const PuntosDeUsuario = require("../models/PuntosDeUsuario");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
//const buscarUsuario = require('../constants/index');

router.get("/", async (req, res) => {
  const listaAUsuarios = await AlimentacionUsuarios.find();

  if (listaAUsuarios.length <= 0)
    return res.status(500).json({
      success: false,
      message: "No se encontro ninguna informacion de usuarios",
    });
  res.send(listaAUsuarios);
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
    const comidaFavorita = await AlimentacionUsuarios.find({
      usuario: req.params.id,
    }).select("comidaFavorita");

    res.send(comidaFavorita);
  } catch (err) {
    console.log("Ocurrió un error al obtener los puntos - ", err);
  }
});

router.post("/:id", async (req, res) => {
  const usuarioCreado = await Usuarios.findOne({ usuario: req.params.id });
  try {
    if (usuarioCreado) {
      const infoUsuario = await AlimentacionUsuarios.findOne({
        usuario: req.params.id,
      });
      try {
        if (infoUsuario)
          return res.status(500).json({
            success: false,
            message: "Informacion de Usuario ya creado",
          });
      } catch (err) {
        console.log("Ocurrió un error al buscar el usuario - ", err);
      }
    }
    console.log("si existe el usuario");
  } catch (err) {
    console.log("Ocurrió un error al buscar el usuario - ", err);
  }
  let aUsuarios = new AlimentacionUsuarios({
    usuario: req.params.id,
    comidaFavorita: req.body.comidaFavorita,
    comidaNoFavorita: req.body.comidaNoFavorita,
    alergiasAlimentarias: req.body.alergiasAlimentarias,
    lugarDeCompras: req.body.lugarDeCompras,
    quienCocina: req.body.quienCocina,
    estatusDieta: {
      sigueDieta: req.body.sigueDieta,
      conNutriologo: req.body.conNutriologo,
    },
    extras: req.body.extras,
    desayuno: req.body.desayuno,
    colacion1: req.body.colacion1,
    comida: req.body.comida,
    colacion2: req.body.colacion2,
    cena: req.body.cena,
    desayunoAyer: req.body.desayunoAyer,
    colacion1Ayer: req.body.colacion1Ayer,
    comidaAyer: req.body.comidaAyer,
    colacion2Ayer: req.body.colacion2Ayer,
    cenaAyer: req.body.cenaAyer,
  });

  try {
    aUsuarios = await aUsuarios.save();

    if (!aUsuarios)
      return res
        .status(400)
        .send("No se pudo agregar alimentacion de usuarios");
    res.send(aUsuarios);
  } catch (err) {
    console.log(
      "Ocurrió un error al guardar los datos de alimentacion de usuarios - ",
      err
    );
  }
});

router.put("/:id", async (req, res) => {
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

  let editarInformacionA;
  try {
    editarInformacionA = await AlimentacionUsuarios.findOneAndUpdate(
      req.params.id,
      {
        usuario: req.body.usuario,
        comidaFavorita: req.body.comidaFavorita,
        comidaNoFavorita: req.body.comidaNoFavorita,
        alergiasAlimentarias: req.body.alergiasAlimentarias,
        lugarDeCompras: req.body.lugarDeCompras,
        quienCocina: req.body.quienCocina,
        estatusDieta: {
          sigueDieta: req.body.sigueDieta,
          conNutriologo: req.body.conNutriologo,
        },
        extras: req.body.extras,
        desayuno: req.body.desayuno,
        colacion1: req.body.colacion1,
        comida: req.body.comida,
        colacion2: req.body.colacion2,
        cena: req.body.cena,
        desayunoAyer: req.body.desayunoAyer,
        colacion1Ayer: req.body.colacion1Ayer,
        comidaAyer: req.body.comidaAyer,
        colacion2Ayer: req.body.colacion2Ayer,
        cenaAyer: req.body.cenaAyer,
      }
    );

    editarInformacionA = await editarInformacionA.save();

    if (!editarInformacionA)
      return res
        .status(500)
        .json({ success: false, message: "No se pudo guardar - ", err });
    res.send(editarInformacionA);
  } catch (err) {
    console.log(
      "Ocurrió un error al actualizar los datos de alimentos - ",
      err
    );
  }
});

module.exports = router;
