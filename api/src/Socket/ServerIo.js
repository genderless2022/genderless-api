let serverIo = (http) => {

    const io = require('socket.io')(http, {
        cors : {
            origin: '*',
        },
    })

    io.on('connection', socket => {

        socket.on('conectado', () => {
            console.log('usuario conectado');
        });

        socket.on('mensaje', (name, permission, message) => {
            io.emit('mensajes', {name, message});
        });

        socket.on('desconectado', () => {
            io.emit('desconectado', {servidor: 'servidor', message: 'ha abandonado la sala'})
        })
    })
}
module.exports = serverIo;