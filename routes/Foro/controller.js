const { response } = require("express");
const Publication = require("../../models/Foro/Publicacion");

const createNewPublication = async (req, res = response) => {
    try {
        let newPublication = new Publication({
            user: req.query.user,
            post: req.body.post,
            file: req.body.file,
        })
        if (!newPublication) {
            return res.status(401).json({ msg: "Fallo al cargar la publicación" });
        }
        newPublication = await newPublication.save();
        return res.status(200).json({ msg: "Creado correctamente" });
    } catch (error) {
        return res.status(500).send({ error });
    }
}

const getAllPublications = async (req, res = response) => {
    try {
        const respuesta = await Publication.find();
        if (!respuesta) {
            return res.status(400).send({ msg: "Verificar lo solicitado" });
        }
        return res.status(200).send(respuesta);
    } catch (error) {
        return res.status(500).send({ error });
    }
}


const getAllPublicationsPupulate = async (req, res = response) => {
    try {
        await Publication.find()
            .populate({ path: "user", select: "nombre apellidoPaterno apellidoMaterno foto" })
            .exec((e, populated) => {
                if (e) {
                    return e;
                }
                res.send(populated);
            });
    } catch (error) {
        return res.status(500).send({ error });
    }
}


const updatePublication = async (req, res = response) => {
    const { _id } = req.params;
    const { post } = req.body;

    try {
        const update = await Publication.findOneAndUpdate({ _id }, { post })
        res.send(update);
    } catch (error) {
        res.send(error);
    }

}

const deletePublication = async (req, res = response) => {
    const { id } = req.query;
    try {
        const del = await Publication.findOneAndDelete({ _id: id });
        res.status(200).json({ msg: "Eliminado correctamente" });
    } catch (error) {
        res.send(error);
    }
}
module.exports = {
    createNewPublication,
    getAllPublications,
    getAllPublicationsPupulate,
    updatePublication,
    deletePublication,
}