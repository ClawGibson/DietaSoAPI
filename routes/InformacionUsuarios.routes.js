const Usuarios = require("../models/Usuarios");
const InformacionUsuarios = require("../models/InformacionUsuarios");
const PuntosDeUsuario = require("../models/PuntosDeUsuario");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const buscarUsuario = require("../constants/index");

router.get("/", async (req, res) => {
  const listaIUsuarios = await InformacionUsuarios.find();

  if (listaIUsuarios.length <= 0)
    return res.status(500).json({
      success: false,
      message: "No se encontro ninguna informacion de usuarios",
    });
  res.send(listaIUsuarios);
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
    const listaInfoUsuarios = await InformacionUsuarios.find({
      usuario: req.params.id,
    })
      .populate("usuario", { id: 1 })
      .select(
        "nombre apellidoPaterno apellidoMaterno foto fechaDeNacimiento genero celular paisDeNacimiento estadoDeNacimiento ciudadDeResidencia tiempoViviendoAhi"
      );

    if (!listaInfoUsuarios.length > 0)
      return res.status(500).json({
        success: true,
        message: "El usuario no tiene logros todavía",
      });

    res.send(listaInfoUsuarios);
  } catch (err) {
    console.log("Error al obtener los logros del usuario", err);
  }
});
/*
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
    const nombre = await InformacionUsuarios.find({
      usuario: req.params.id,
    }).select("nombre");

    res.send(nombre);
  } catch (err) {
    console.log("Ocurrió un error al obtener los puntos - ", err);
  }
});
*/

router.post("/:id", async (req, res) => {
  const usuarioCreado = await Usuarios.findOne({ usuario: req.params.id });
  try {
    if (usuarioCreado) {
      const infoUsuario = await InformacionUsuarios.findOne({
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
    } else console.log("El usuario no existe");
  } catch (err) {
    console.log("Ocurrió un error al buscar el usuario - ", err);
  }

  let informacion = new InformacionUsuarios({
    usuario: req.query.usuario,
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
    informacion = await informacion.save();

    if (!informacion)
      return res
        .status(400)
        .send("No se pudo agregar la informacion al usuario");
    res.send(informacion);
  } catch (err) {
    console.log("Ocurrió un error al guardar informacion de usuario - ", err);
  }
});

router.put("/:id", async (req, res) => {
  buscarUsuario(req.params.id);

  let editarInformacion;
  try {
    editarInformacion = await InformacionUsuarios.findOneAndUpdate(
      req.params.id,
      {
        usuario: req.body.usuario,
        nombre: req.body.nombre,
        apellidoPaterno: req.body.apellidoPaterno,
        apellidoMaterno: req.body.apellidosMaterno,
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
        .json({
          success: false,
          message: "No se pudo guardar informacion - ",
          err,
        });
    res.send(editarInformacion);
  } catch (err) {
    console.log(
      "Ocurrió un error al actualizar informacion de usuario - ",
      err
    );
  }
});

router.patch("/actualizarInfo", async (req, res) => {
  try {
    let findInfo = await InformacionUsuarios.find({
      usuario: req.query.usuario,
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

    if (!findInfo)
      return res.status(404).send({
        success: false,
        message: "No se encontro informacion",
      });
    const actualStatus = findInfo[0].status;

    findInfo[0].status = !actualStatus;

    findInfo = findInfo[0].save();

    if (!findInfo)
      return res.status(500).send({
        success: false,
        message: "Ocurrio un error en la actualizacion de los daros",
      });

    res.status(200).send({ success: true, message: "Informacion actualizada" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Ha ocurrido un erro mientras se actualizaba la informacion",
      error: error.message,
    });
  }
});
module.exports = router;
