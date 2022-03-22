const Chat = require('../models/Chat/Chat');
const Usuario = require('../models/Usuarios');
const Message = require('../models/Message/message');
const InformacionUsuarios = require('../models/InformacionUsuarios');

const socketController = (socket) => {
    socket.on('get-chat', async ({ id, isAdmin, patientId }) => {
        let userPatientId;

        if (patientId) {
            userPatientId = await InformacionUsuarios.findOne({
                _id: patientId,
            });
        }

        const users = [];

        //Get User chat
        let chat = await Chat.findOne({
            users: isAdmin ? userPatientId.usuario : id,
        });

        //Creamos un chat con el administrador
        if (!chat && !isAdmin) {
            //buscamos al administrador
            console.log('EL paciente creo el chat');
            const admin = await Usuario.findOne({ esAdmin: true });
            users.push(id, admin._id);
            //enviamos el id del chat.
        } else if (!chat && isAdmin) {
            //Creamos un chat con el usuario seleccionad
            console.log('EL administrador creo el chat');
            users.push(id, userPatientId.usuario);
        }

        let messages = [];

        if (!chat) {
            chat = new Chat({ users });
            await chat.save();
        } else {
            messages = await Message.find({
                chat: chat.chat,
            })
                .sort({ date: 'desc' })
                .limit(15)
                .skip(1);
        }
        console.log('CHAT:', chat, 'MESSAGES:', messages);
        socket.join(String(chat._id));
        socket.emit('getMessages', {
            chatId: chat._id,
            messages,
        });
    });

    socket.on('sendMessage', async (data) => {
        const msg = new Message({
            chat: data.chat,
            message: data.message.text,
            user: data.user,
            date: new Date(),
        });

        await msg.save();

        data.message.user._id = 2;

        socket.to(String(data.chat)).emit('rm', {
            message: data.message,
        });
    });

    socket.on('disconnect', () => {
        console.log('disconnect');
        socket.rooms.size === 0;
    });
};

module.exports = { socketController };
