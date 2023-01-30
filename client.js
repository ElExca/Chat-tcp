const net = require('net');

const readLine = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const waitForUsername = new Promise(resolve => {
    readLine.question('Escribe el nombre de usuario que desees: ', answer => {
        resolve(answer);
    });
});

waitForUsername.then((username) => {

    const socket = net.connect({
        port: 4000,
        //poner el ip del host si te vas a conectar a otra pc
        //host:'ip de la maquina que sera el servidor'

    });

    readLine.on('line', data => {
        if (data === 'quit') {
            socket.write(`${username} has left the chat.`);
            socket.setTimeout(1000);
        } else {
            socket.write(username + ': ' + data);
        }
    });

    socket.on('connect', () => {
        socket.write('El usuario: ' + username + ' se a unido');
    });

socket.on('data', data => {
    console.log('\x1b[33m%s\x1b[0m',data);
});

socket.on('timeout', () => {
    socket.write('salir');
    socket.end();
});

socket.on('end', () => {
    process.exit();
});



socket.on('error', (err)=>{
    console.log(err.message)
})

});
