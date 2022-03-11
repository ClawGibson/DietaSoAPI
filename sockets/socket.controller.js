const Chat = require('../models/Chat/Chat');
const Usuario = require('../models/Usuarios');
const Message = require('../models/Message/message');

const socketController = (socket) => {

    socket.on("get-chat", async ({id, isAdmin, patientId}) =>{

        console.log("patientId --> ", patientId);

        const users = [];

        //Get User chat
        const chat = await Chat.findOne({
            users:id
        });

        // console.log("chat ---> ", chat);

        //Creamos un chat con el administrador
        if(!chat && !isAdmin){
            //buscamos al administrador
            const admin = await Usuario.findOne({ esAdmin: true});
            users.push(id, admin._id);
            //enviamos el id del chat.
        } 

        if(!chat && isAdmin){
            //Creamos un chat con el usuario seleccionad
            users.push(id, patientId);
        }

        if(!chat){
            const newChat = new Chat({ users });
            await newChat.save();
        }

        const messages = await Message.find({
            chat: chat._id
        });

        console.log("messages --> ", messages);

        socket.join(chat._id);
        socket.to(chat._id).emit("getMessages", {
            chatId: chat._id,
            messages
        });

    });



    // socket.on('connect', () => {
    //     console.log(`Connected to server ${socket.id}`);
    // });

    // socket.on('enviar-mensaje', (payload, callback) => {
    //     console.log(`[enviar-mensaje]: ${payload}`);
    //     //socket.broadcast.emit('enviar-mensaje', payload); // Enviar el mensaje a todos los sockets conectados con broadcast.
    //     socket.emit('mensaje-recibido', payload);
    //     try {
    //         callback();
    //     } catch (error) {
    //         console.log(`[enviar-mensaje-ERROR]: ${error}`);
    //     }
    // });

    // /* socket.on('mensaje-recibido', (payload, callback) => {
    //     console.log(`[mensaje-recibido]: ${payload}`);
    //     try {
    //         callback();
    //     } catch (error) {
    //         console.log(`[mensaje-recibido-ERROR]: ${error}`);
    //     }
    // }); */

    // socket.on('crear-chat', (payload, callback) => {
    //     console.log(`[crear-chat]: ${payload}`);

    //     try {
    //         callback();
    //     } catch (error) {
    //         console.log(`[crear-chat-ERROR]: ${error}`);
    //     }
    // });

    // socket.on('crear-recordatorio', (payload, callback) => {
    //     try {
    //         console.log(`[crear-recordatorio]: ${payload}`);
    //         socket.emit('recordatorio-creado', payload);
    //         callback();
    //     } catch (error) {
    //         console.log(`[crear-recordatorio-ERROR]: ${error}`);
    //     }
    // });
};

module.exports = { socketController };
