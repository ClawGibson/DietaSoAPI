const socketController = (socket) => {
    socket.on('connect', () => {
        console.log(`Connected to server ${socket.id}`);
    });

    socket.on('enviar-mensaje', (payload, callback) => {
        console.log(payload);
        //socket.broadcast.emit('enviar-mensaje', payload); // Enviar el mensaje a todos los sockets conectados con broadcast.
        callback({
            ok: true,
            mensaje: 'Todo salio bien',
        });
    });

    socket.on('crear-chat', (payload, callback) => {
        console.log('payload:', payload);

        try {
            callback();
        } catch (error) {
            console.log(error);
        }
    });
};

module.exports = { socketController };
