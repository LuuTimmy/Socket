const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const  { Server } = require('socket.io');
const io = new Server(server);
const maxPlayer = 2;

let rooms = [];

app.use(express.static('src'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/src/index.html");
});

io.on('connection', (socket) => {
    console.log(`user ${socket.id} is connected`);
    socket.on('disconnect', () => {
        console.log(`user ${socket.id} is disconnect`);
        let room = null;
        
    });
    socket.on('playerData', (player) => {
        let room = null;

        if (!player.roomId) {
            room = createRoom(player);
            socket.emit('setRoomId', room.id);
        }
        else {
            room = rooms.find(room => room.id === player.roomId);
            if (room === undefined) {
                console.log("this room doesn't exist");
                return ;
            }
            if (room.players.length >= maxPlayer) {
                console.log("this room is full");
                return ;
            }
            room.players.push(player);
        }
        socket.join(room.id);
        io.to(room.id).emit('show your room', room);
        io.to(room.id).emit('write in tchat', player.username, "join the Game");
        console.log(rooms);
    });
    socket.on('requestShowRooms', () => {
        socket.emit('showRooms', rooms);
    });
    socket.on('request tchat', (player, valueText) => {
        io.to(player.roomId).emit('write in tchat', player.username, valueText);
    });
    socket.on('start game request', (player) => {
        io.to(player.roomId).emit('start game');
    });
});

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