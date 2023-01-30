const net = require('net');

let sockets = [];

const server = net.createServer(socket => {

    sockets.push(socket);
    console.log('Cliente conectado.');
    
    socket.on('data', data => {
        broadcast(data, socket);
    });

    socket.on('error', err => {
        console.log('El cliente se a desconectado.');
    });

    socket.on('close', () => {
        console.log("El cliente se a ido del chat");
    });

});

server.listen(4000);

function broadcast(message, socketSent) {
    if (message === 'quit') {
        const index = sockets.indexOf(socketSent);
        sockets.splice(index, 1);
    } else {
        sockets.forEach(socket => {
            if (socket !== socketSent) socket.write(message);
        });
    }
}