// let serverIo = (http) => {

//     const io = require('socket.io')(http, {
//         cors : {
//             origin: '*',
//         },
//     })
    
//     io.on('connection', socket => {
//         let nombre;
//         socket.on('Conectado', (name) => {
//             nombre = name;
//             socket.broadcast.emit('mensajes', {nombre:nombre, message: `${nombre} se ha conectado`});
//         });

//         socket.on('mensaje', (name, permission, message) => {
//             io.emit('mensajes', {name, message});
//         });

//         socket.on('disconnect', () => {
//             io.emit('mensajes', {http: 'http', message: `${nombre} se ha desconectado`});
//         })
//     })
// }

const Socket = require('socket.io');

var socket = function (http){
    const io = Socket(http, {cors: {origin: '*'}});
    const users = [];

    io.on('connection', (socket) => {
        socket.on('disconnect', () => {
            const user = users.find((x) => x.socketName === socket.name);
            if (user) {
                user.online = false;
                const admin = users.find((x) => x.isAdmin && x.online);
                if (admin) {
                    io.to(admin.socketName).emit('updateUser', user);
                }
            }
        });

        socket.on('connected', (user) => {
            const updatedUser = {
                ...user,
                online: true,
                socketName: socket.name,
                messages: [],
            };
            const existUser = users.find((x) => x.name === updatedUser.name);
            if (existUser) {
                existUser.socketName = socket.name;
                existUser.online = true;
            } else {
                users.push(updatedUser);
            }
            const admin = users.find((x) => x.isAdmin && x.online);
            if (admin) {
                io.to(admin.socketName).emit('updateUser', updatedUser);
            }
            if (updatedUser.isAdmin) {
                io.to(updatedUser.socketName).emit('listUsers', users);
            }
        });

        socket.on('onUserSelected', (user) => {
            const admin = users.find((x) => x.isAdmin && x.online);
            if (admin) {
                const existUser = users.find((x) => x.name === user.name);
                user.messages.push(message)
            }
        })

        socket.on('onMessage', (message) => {
            if (message.isAdmin) {
                const user = users.find((x) => x.name === message.name && x.online);
                if (user) {
                    io.to(user.socketName).emit('message', message);
                    user.messages.push(message);
                }
            } else {
                const admin = users.find((x) => x.isAdmin && x.online);
                if (admin) {
                    io.to(admin.socketName).emit('message', message);
                    const user = users.find((x) => x.name === message.name && x.online);
                    user.messages.push(message);
                } else {
                    io.to(socket.Name).emit('message', {
                        name: 'Admin',
                        message: 'Lo sentimos, no hay un administrador conectado',
                    });
                }
            }
        })
    })
}
module.exports = socket;