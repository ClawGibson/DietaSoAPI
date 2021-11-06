const socketController = (socket) => {
    socket.on('connect', () => {
        console.log(`Connected to server ${socket.id}`);
    });

    socket.on('enviar-mensaje', (payload, callback) => {
        console.log(`[enviar-mensaje]: ${payload}`);
        //socket.broadcast.emit('enviar-mensaje', payload); // Enviar el mensaje a todos los sockets conectados con broadcast.
        callback();
    });

    socket.on('mensaje-recibido', (payload, callback) => {
        console.log(`[mensaje-recibido]: ${payload}`);
        socket.emit('enviar-mensaje', callback);
    });

    socket.on('crear-chat', (payload, callback) => {
        console.log(`[crear-chat]: ${payload}`);

        try {
            callback();
        } catch (error) {
            console.log(error);
        }
    });
};

module.exports = { socketController };
