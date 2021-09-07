const Usuarios = require("../models/Usuarios");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { buscarUsuario } = require("../constants/index");
const { ObjectId } = require("mongodb");

const buscarUsuarioo = async (id) => {
  try {
    const buscarUsuarioo = await Usuarios.find({
      usuario: id,
    });

    if (!buscarUsuarioo)
      return res.status(404).send({
        Error: "No se encontró el registro de usuario",
      });
    return buscarUsuarioo;
  } catch (error) {
    return res.status(500).json({
      error: `Error al buscar al usuario - ${error}`,
    });
  }
};

router.get("/", async (req, res) => {
  let listaUsuarios;
  try {
    listaUsuarios = await Usuarios.find().select("-contrasena");
  } catch (error) {
    //console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Error al buscar usuarios" });
  }

  if (!listaUsuarios)
    return res
      .status(404)
      .json({ success: false, message: "No se encontraron usuarios" });

  res.send(listaUsuarios);
});

router.get("/individual", async (req, res) => {
  //console.log("entro endpoint");
  try {
    const usuario = await Usuarios.findById(req.query.usuario).select(
      "-contrasena"
    );
    //console.log("entro try", usuario);
    if (!usuario)
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado" });
    res.send(usuario);
  } catch (err) {
    //console.log("Error al buscar el usuario - ", err);
    return res
      .status(500)
      .json({ success: false, message: "Error al buscar el usuario" });
  }
});

router.post("/", async (req, res) => {
  let crearUsuario = new Usuarios({
    email: req.body.email,
    contrasena: bcrypt.hashSync(req.body.contrasena, 10),
  });

  crearUsuario = await crearUsuario.save();

  if (!crearUsuario)
    return res.status(400).send("No se pudo crear el usuario :c");

  res.send(crearUsuario);
});

router.post("/login", async (req, res) => {
  const usuario = await Usuarios.findOne({ email: req.body.email });
  const SECRET = process.env.SECRET;

  if (!usuario) {
    return res.status(400).send("Usuario no registrado :c");
  }

  if (usuario && bcrypt.compareSync(req.body.contrasena, usuario.contrasena)) {
    const token = jwt.sign(
      {
        userId: usuario.id,
        isAdmin: usuario.esAdmin,
      },
      SECRET,
      { expiresIn: "1y" }
    );
    res.status(200).send({ usuario: usuario.email, token: token });
  } else {
    res.status(400).send("Contraseña incorrecta");
  }
});

router.post("/register", async (req, res) => {
  try {
    const usuario = await Usuarios.findOne({ email: req.body.email });

    if (usuario)
      return res
        .status(403)
        .json({ success: false, message: "Usuario ya creado" });
  } catch (err) {
    //console.log("Ocurrió un error al buscar el usuario - ", err);
    return res.status(500).json({
      success: false,
      message: "Ocurrió un error al buscar el usuario",
    });
  }

  let registrarUsuario = new Usuarios({
    email: req.body.email,
    contrasena: bcrypt.hashSync(req.body.contrasena, 10),
  });

  try {
    registrarUsuario = await registrarUsuario.save();
    if (!registrarUsuario)
      return res.status(500).send("No se pudo agregar al usuario");
    const buscarIdUsuario = await Usuarios.find({
      email: req.body.email,
    });

    registrarUsuario.usuario = buscarIdUsuario[0].id;

    registrarUsuario = await registrarUsuario.save();

    if (!registrarUsuario)
      return res.status(500).send("No se pudo agregar al usuario");

    res.send(registrarUsuario);
  } catch (err) {
    //console.log("Ocurrió un error al guardar usuario - ", err);
    return res.status(500).json({
      success: false,
      message: "Ocurrió un error al guardar el usuario",
    });
  }
});

router.patch("/individual", async (req, res) => {
  try {
    let usuarioEncontrado = await buscarUsuarioo(req.query.usuario);
    console.log(usuarioEncontrado[0].usuario);
    let editarUsuario = await Usuarios.findOneAndUpdate(
      { usuario: usuarioEncontrado[0].usuario },
      {
        email: req.body.email,
        contrasena: bcrypt.hashSync(req.body.contrasena, 10),
      }
    );
    console.log(editarUsuario);
    editarUsuario = editarUsuario
      .save()
      .then((response) => res.status(200).json({ message: "ok" }))
      .catch((err) =>
        res.status(500).json({
          success: false,
          message: "No se pudo guardar - ",
          err,
        })
      );
    console.log(editarUsuario);
  } catch (err) {
    //console.log("Ocurrió un error al guardar usuario - ", err);
    return res.status(500).json({
      success: false,
      message: "Ocurrió un error al actualizar el usuario",
    });
  }
});
module.exports = router;
