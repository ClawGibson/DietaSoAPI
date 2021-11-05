const { response } = require("express");
const Chat = require("../../models/Chat/Chat");

const createNewChat = async (req, res = response) => {
    try {
        let newChat = new Chat({
            usuarios: req.body.usuarios,
        })
        newChat = await newChat.save();
        if (!newChat) {
            return res.status(401).json({ msg: "Son necesarios los usuarios" })
        }
        res.status(200).json("Creado correctamente");
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error })
    }
};


const getAllChats = async (req, res = response) => {
    try {
        await Chat.find().populate({ path: "usuarios", select: "nombre apellidoPaterno apellidoMaterno foto" })
            .exec((e, populated) => {
                if (e) {
                    return e;
                }
                res.send(populated);
            });
    } catch (error) {
        res.status(500).json({ error })
    }
};

const deleteChat = async (req, res = response) => {
    try {
        const _id = req.params.id;
        const chat = await Chat.findOneAndDelete({ _id });
        if (!chat) {
            res.status(400).json({ msg: "No se ha encontrado el chat seleccionado" })
        }
        res.status(200).json({
            msg: "Chat eliminado"
        })
    } catch (error) {
        res.status(400).json({ error })

    }


};
module.exports = {
    createNewChat,
    getAllChats,
    deleteChat,
}