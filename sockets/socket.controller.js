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
        const page = 1;
        const limit = 15;

        if (!chat) {
            chat = new Chat({ users });
            await chat.save();
        } else {
            messages = await Message.paginate({chat: chat._id}, {sort:{ date:'desc' }, page, limit});
        }
        socket.join(String(chat._id));
        socket.emit('getMessages', {
            chatId: chat._id,
            messages: messages.docs,
            page,
            limi
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
