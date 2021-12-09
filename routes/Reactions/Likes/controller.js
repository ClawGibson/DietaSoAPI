const { response } = require("express");
const Like = require("../../../models/Reactions/Likes");

const agregarLike = async (req, res = response) => {
    try {
        let newLike = await new Like({
            user: req.body.user,
            publicacion: req.body.publicacion
        });
        newLike = await newLike.save();
        if (!newLike) {
            return res.status(400).json({
                msg: "Ocurrio un error en la petición"
            })
        }
        return res.status(200).json({
            msg: "Se ha agregado un like"
        })
    } catch (error) {
        return res.status(500).json(error);
    }
}

const obtenerLikes = async (req, res = response) => {
    try {
        const allLikes = await Like.find({});
        res.status(200).json(allLikes);

    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" })
    }
}

const obtenerLikesPorPublicacion = async (req, res = response) => {
    try {
        const publicacion = req.query.id;
        const allLikes = await Like.find({ publicacion });
        return res.status(200).json(allLikes);

    } catch (error) {
        return res.status(500).json({ msg: "Error en el servidor" })
    }
}

const obetenerLikePorUsuario = async (req, res = response) => {
    try {
        const usuario = req.query.usuario;
        const publicacion = req.query.id;
        const like = await Like.find({ user: usuario, publicacion: publicacion });
        if (!like) {
            return res.status(400).json({ msg: "Ocurrio un error en la petición" })
        }
        return res.status(200).json(like);

    } catch (error) {
        return res.status(500).json({ msg: "Error en el servidor" })
    }
}

const eliminarLike = async (req, res = response) => {
    try {
        const usuario = req.query.usuario;
        const publicacion = req.query.id;
        const disLike = await Like.findOneAndDelete({
            user: usuario,
            publicacion: publicacion,
        })
        res.status(200).json({
            msg: "Se ha eliminado",
            disLike
        });
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}

module.exports = {
    agregarLike,
    obtenerLikes,
    obtenerLikesPorPublicacion,
    obetenerLikePorUsuario,
    eliminarLike,
}