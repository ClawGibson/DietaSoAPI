const socketController = (socket) => {
    socket.on('connect', () => {
        console.log(`Connected to server ${socket.id}`);
    });

    socket.on('enviar-mensaje', (payload, callback) => {
        console.log(`[enviar-mensaje]: ${payload}`);
        //socket.broadcast.emit('enviar-mensaje', payload); // Enviar el mensaje a todos los sockets conectados con broadcast.
        socket.emit('mensaje-recibido', payload, callback);
        try {
            callback();
        } catch (error) {
            console.log(`[enviar-mensaje-ERROR]: ${error}`);
        }
    });

    socket.on('mensaje-recibido', (payload, callback) => {
        console.log(`[mensaje-recibido]: ${payload}`);
        try {
            callback();
        } catch (error) {
            console.log(`[mensaje-recibido-ERROR]: ${error}`);
        }
    });

    socket.on('crear-chat', (payload, callback) => {
        console.log(`[crear-chat]: ${payload}`);

        try {
            callback();
        } catch (error) {
            console.log(`[crear-chat-ERROR]: ${error}`);
        }
    });

    socket.on('crear-chat', (payload, callback) => {
        console.log('payload:', payload);
        console.log('callback:', callback);
    });
};

module.exports = { socketController };
