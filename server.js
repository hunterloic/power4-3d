const http = require('http');
const app = require('./app');
const socketio = require('socket.io');

const game = require('./api/model/game');

const port = process.env.POWER4_BACKEND_PORT || 3000;

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('gameRestart', (message) => {
        console.log(JSON.stringify(message));
        socket.broadcast.emit('gameRestart', message);
    });

    socket.on('playerJoin', (message) => {
        socket.broadcast.emit('playerJoin', message);
    });
  
    socket.on('playerMove', (message) => {
        console.log("player move : " + JSON.stringify(message));
        
        var result = game.play(
            message.player,
            message.x,
            message.y,
            message.z,
        );

        socket.broadcast.emit('playerMove', message);
    });

    socket.on('disconnect', () => {
        console.log("disconnect");
        game.initialize();
        socket.broadcast.emit('playerLeave');

    });
});

server.listen(port);