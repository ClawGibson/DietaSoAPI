const Usuarios = require("../models/Usuarios");
const AlimentacionUsuarios = require("../models/AlimentacionUsuarios");
const PuntosDeUsuario = require("../models/PuntosDeUsuario");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  const listaAUsuarios = await AlimentacionUsuarios.find();

  if (listaAUsuarios.length <= 0)
    return res.status(500).json({
      success: false,
      message: "No se encontro ningun registro de la alimentacion de usuarios",
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
    }).select(
      "comidaFavorita comidaNoFavorita alergiasAlimentarias lugarDeCompras quienCocina estatusDieta extras desayuno colacion1 comida colacion2 cena desayunoAyer colacion1Ayer comidaAyer colacion2Ayer cenaAyer"
    );

    if (!comidaFavorita.length > 0)
      return res.status(500).json({
        success: true,
        message: "El usuario no tiene informacion de su alimentacion",
      });

    res.send(comidaFavorita);
  } catch (err) {
    console.log(
      "Ocurrió un error al obtener la informacion de alimentacion - ",
      err
    );
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
            message: "Alimentacion de Usuario ya registrada",
          });
      } catch (err) {
        console.log("Ocurrió un error al buscar el usuario - ", err);
      }
    } else console.log("El usuario no existe");
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
    estatusDieta: req.body.estatusDieta,
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
        .send("No se pudo agregar los datos de alimentacion de usuarios");
    res.send(aUsuarios);
  } catch (err) {
    console.log(
      "Ocurrió un error al guardar los datos de alimentacion de usuarios - ",
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

  let editarInformacionA;
  try {
    editarInformacionA = await AlimentacionUsuarios.findOneAndUpdate(
      req.params.id,
      {
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

    editarInformacionA = editarInformacionA
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
      "Ocurrió un error al actualizar los datos de alimentos - ",
      err
    );
  }
});

router.post("/comidaFav/:id", async (req, res) => {
  const usuarioCreado = await Usuarios.findOne({ usuario: req.params.id });
  try {
    if (usuarioCreado) {
      const comidaFav = await AlimentacionUsuarios.findOne({
        usuario: req.params.id,
        comidaFavorita: req.body.comidaFavorita,
      });
      //console.log(usuarioCreado);
      try {
        //console.log(comidaFav);
        if (comidaFav)
          return res.status(500).json({
            success: false,
            message: "Esa comida ya esta registrada",
          });
      } catch (err) {
        console.log("Ocurrió un error al buscar el usuario - ", err);
      }
    } else console.log("El usuario no existe");
  } catch (err) {
    console.log("Ocurrió un error al buscar el usuario - ", err);
  }

  var nuevaComidaFav = { comidaFavorita: req.body.comidaFavorita };
  //console.log(nuevaComidaFav.comidaFavorita);
  AlimentacionUsuarios.findOneAndUpdate(
    { usuario: req.params.id },
    { $push: { comidaFavorita: nuevaComidaFav.comidaFavorita } },
    function (error, success) {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({ success: false, message: "Comida ya esta registrada" });
      } else {
        //console.log(success);
        res.send("ok");
      }
    }
  );
});

router.get("/comidaFav/:id", async (req, res) => {
  try {
    const comidaFavorita = await AlimentacionUsuarios.find({
      usuario: req.params.id,
    }).select("comidaFavorita");

    if (!comidaFavorita.length > 0)
      return res.status(500).json({
        success: true,
        message: "El usuario no tiene informacion de su alimentacion",
      });

    res.send(comidaFavorita);
  } catch (err) {
    console.log(
      "Ocurrió un error al obtener la informacion de alimentacion - ",
      err
    );
  }
});

router.delete("/comidaFav/:id", async (req, res) => {
  const usuarioCreado = await Usuarios.findOne({ usuario: req.params.id });
  try {
    if (usuarioCreado) {
      const comidaFav = await AlimentacionUsuarios.findOne({
        usuario: req.params.id,
        comidaFavorita: req.body.comidaFavorita,
      });
      //console.log(usuarioCreado);
      try {
        //console.log(comidaFav);
        if (!comidaFav)
          return res.status(500).json({
            success: false,
            message: "Esa comida no existe",
          });
      } catch (err) {
        console.log("Ocurrió un error al buscar el usuario - ", err);
      }
    } else console.log("El usuario no existe");
  } catch (err) {
    console.log("Ocurrió un error al buscar el usuario - ", err);
  }

  var nuevaComidaFav = { comidaFavorita: req.body.comidaFavorita };
  //console.log(nuevaComidaFav.comidaFavorita);
  AlimentacionUsuarios.findOneAndUpdate(
    { usuario: req.params.id },
    { $pull: { comidaFavorita: nuevaComidaFav.comidaFavorita } },
    function (error, success) {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({ success: false, message: "error al eliminar la comida" });
      } else {
        //console.log(success);
        res.send("ok");
      }
    }
  );
});

module.exports = router;
