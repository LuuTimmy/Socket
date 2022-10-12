const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const  { Server } = require('socket.io');
const io = new Server(server);

let rooms = [];

app.use(express.static('src'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/src/index.html");
});

io.on('connection', (socket) => {
    console.log(`user ${socket.id} is connected`);
    socket.on('disconnect', () => {
        console.log(`user ${socket.id} is disconnect`);
    });
    socket.on('playerData', (player) => {
        let room = null;

        if (player.host == true) {
            room = createRoom(player);
        }
        else {
            room = joinRoom(player);
        }
        socket.join(room.id);
        io.to(socket.id).emit('join room', room.id);
        console.log(rooms);
    });
    socket.on('requestShowRoom', () => {
        socket.emit('showRoom', rooms);
    });
});

function joinRoom() {

}

function createRoom(player) {
    const roomId = Math.random().toString(36).substr(2, 9);
    const room = {id: roomId, players: []};
    
    player.roomId = roomId;
    room.players.push(player);
    rooms.push(room);
    return (room);
}

server.listen(3000, () => {
    console.log(`Listening to PORT 3000`);
});