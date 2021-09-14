const Usuarios = require("../models/Usuarios");
const InformacionUsuarios = require("../models/InformacionUsuarios");
const PuntosDeUsuario = require("../models/PuntosDeUsuario");
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
        Error: "No se encontró el registro de información de usuario",
      });
    return buscarUsuarioo;
  } catch (error) {
    return res.status(500).json({
      error: `Error al buscar información de usuario - ${error}`,
    });
  }
};

router.get("/", async (req, res) => {
  try {
    const listaIUsuarios = await InformacionUsuarios.find();

    if (listaIUsuarios.length <= 0)
      return res.status(500).json({
        success: false,
        message: "No se encontro ninguna información de usuarios",
      });
    res.send(listaIUsuarios);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Ocurrió un error al buscar la información de los usuarios",
    });
  }
});

router.get("/individual", async (req, res) => {
  try {
    const usuario = await buscarUsuario(req.query.usuario);
    console.log(usuario);

    if (!usuario)
      return res
        .status(404)
        .send({ Error: "No se encontró el usuario proporcionado" });

    const listaInfoUsuarios = await InformacionUsuarios.find({
      usuario: req.query.usuario,
    });
    console.log(listaInfoUsuarios);
    if (!listaInfoUsuarios)
      return res.status(404).send({
        message: "El usuario no tiene información",
      });

    res.send(listaInfoUsuarios);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "El usuario no existe",
    });
  }
});

router.post("/individual", async (req, res) => {
  try {
    const usuarioCreado = await Usuarios.findById(req.query.usuario);
    if (usuarioCreado) {
      //console.log("si existe ese usuario");
      try {
        const infoUsuario = await InformacionUsuarios.findOne({
          usuario: req.query.usuario,
        });

        if (infoUsuario) {
          return res.status(500).json({
            success: false,
            message: "Información de Usuario ya registrada",
          });
        } else console.log("no existe usuario");
      } catch (err) {
        return res.status(500).json({
          success: false,
          message: "Ocurrió un error al buscar la información el usuario",
        });
      }
    } else {
      return res.status(500).json({
        success: false,
        message: "El usuario no existe",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Ocurrió un error al buscar el usuario",
    });
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
        .send("No se pudo agregar la información al usuario");
    res.send(informacion);
  } catch (err) {
    return res
      .status(400)
      .send("Ocurrió un error al guardar información de usuario");
  }
});

router.patch("/individual", async (req, res) => {
  try {
    let usuarioEncontrado = await buscarUsuarioo(req.query.usuario);
    //console.log(usuarioEncontrado[0].usuario);
    if (!usuarioEncontrado[0]) {
      return res
        .status(500)
        .json({ success: false, message: "El usuario no existe" });
      //console.log("entra al if");
    } //else console.log("no entro al if", usuarioEncontrado[0]);

    try {
      let editarUsuario = await InformacionUsuarios.findOneAndUpdate(
        { usuario: usuarioEncontrado[0].usuario },
        {
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
        }
      );

      //console.log(editarUsuario);
      editarUsuario = editarUsuario
        .save()
        .then((response) => res.status(200).json({ message: "ok" }))
        .catch((err) =>
          res.status(500).json({
            success: false,
            message: "No se pudo guardar la nueva información - ",
            err,
          })
        );
      //console.log(editarUsuario);
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Ocurrió un error al actualizar informacion de usuario- ",
        err,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Ocurrió un error al buscar al usuario - ",
      err,
    });
  }
});

module.exports = router;
