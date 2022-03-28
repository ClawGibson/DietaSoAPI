const { response } = require("express");
const mongoose = require("mongoose");
const Comment = require("../../models/Reactions/Comments");

const createNewComment = async (req, res = response) => {
    try {
        let newComment = new Comment({
            id_publicacion: req.params.id,
            user: req.body.user,
            text: req.body.text,
        })

        newComment = await newComment.save();
        if (newComment) {
            return res.status(200).json({ msg: "Comentario creado con éxito" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error });
    }
}

const getCommentsByIdPublication = async (req, res = response) => {
    try {
        const { id } = req.params;

        const comments = await Comment.find({ id_publicacion: id }).populate("user");
        if (comments.length > 0) {
            res.status(200).json({
                comments,
            })
        } else {
            res.status(204).send();
        }

    } catch (error) {

    }
}

module.exports = {
    createNewComment,
    getCommentsByIdPublication
}