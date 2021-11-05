const { response } = require('express');
const mongoose = require('mongoose');
const Chat = require('../../models/Chat/Chat');

const createNewChat = async (req, res = response) => {
    try {
        let newChat = new Chat({
            users: req.body.users,
        });
        newChat = await newChat.save();
        if (!newChat) {
            return res.status(401).json({ msg: 'Son necesarios los usuarios' });
        }
        res.status(200).json('Creado correctamente');
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error });
    }
};

const getAllChats = async (req, res = response) => {
    try {
        const allChats = await Chat.find();
        res.status(200).json({
            chats: allChats,
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const getChatId = async (req, res = response) => {
    try {
        const { id1, id2 } = req.params;

        // Fin the chat where the adminId and userId are in the users array
        const chat = await Chat.find({
            users: [mongoose.Types.ObjectId(id1), mongoose.Types.ObjectId(id2)],
        });

        if (!chat) {
            res.status(400).json({
                msg: 'No se ha encontrado el chat seleccionado',
            });
        }
        res.status(200).json({
            chat,
        });
    } catch (error) {
        res.status(400).json({ error });
    }
};

const deleteChat = async (req, res = response) => {
    try {
        const _id = req.params.id;
        const chat = await Chat.findOneAndDelete({ _id });
        if (!chat) {
            res.status(400).json({
                msg: 'No se ha encontrado el chat seleccionado',
            });
        }
        res.status(200).json({
            msg: 'Chat eliminado',
        });
    } catch (error) {
        res.status(400).json({ error });
    }
};
module.exports = {
    createNewChat,
    getAllChats,
    getChatId,
    deleteChat,
};
