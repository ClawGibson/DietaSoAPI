const { response } = require("express");
const Message = require("../../models/Message/message");

const addMessage = async (req, res = response) => {
    try {
        let newMessage = await new Message({
            chat: req.body.chat,
            user: req.body.user,
            message: req.body.message,
            date: new Date()
        });
        newMessage = await newMessage.save();
        if (!newMessage) {
            return res.status(400).json({
                msg: "No se puede crear el mensaje[Error en la petición]"
            });
        }
        res.status(200).json({ msg: "Creado correctamente", newMessage })

    } catch (error) {
        return res.status(500).json({ error });
    }
}

const getMessages = async (req, res) => {
    try {
        const chat = req.params.id;
        const allChat = await Message.find({ chat })/*.populate({ path: "chat", select: "users" })*/;
        res.status(200).json({ msg: allChat })
    } catch (error) {
        res.status(204).json({ error });
    }
};

const deleteMessage = async (req, res) => {
    try {
        const messageId = req.params.id;
        const deleteMessage = await Message.findOneAndDelete({ _id: messageId });
        if (!deleteMessage) {
            res.status(400).json({ msg: "No se encontro mensaje" });
        }
        res.status(200).json({ msg: "Eliminado correctamente" });
    }
    catch (error) {
        res.status(400).json({ error });
    }
}

module.exports = {
    addMessage,
    getMessages,
    deleteMessage,
}