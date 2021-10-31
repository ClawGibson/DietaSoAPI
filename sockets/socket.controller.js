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
};

module.exports = { socketController };
