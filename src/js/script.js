const socket = io();
const maxPlayer = 2;
const createRoomButton = document.querySelector("#create-room");
const displayRoomsButton = document.querySelector("#display-rooms");
const quitRoomsMenu = document.querySelector("#quit-rooms-menu");
const gameMenu = document.querySelector("#game-menu");
const roomList = document.querySelector("#rooms-list");
const roomMenu = document.querySelector("#rooms-menu");
roomMenu.style.display = "none";

const inRoom = document.querySelector("#in-room");
const launchGame = inRoom.querySelector("#launch-game")
const playersInRoom = inRoom.querySelector("#players-in-room");
inRoom.style.display = "none";

const tchat = document.querySelector("#tchat");
const tchatText = tchat.querySelector("#tchat-text");
const formTchat = document.querySelector("#form-tchat");
tchat.style.display = "none";

const playButton = inRoom.querySelector("#launch-game");
const game = document.querySelector("#game");
game.style.display = "none";

const player = {
    host: false,
    roomId: null,
    username: "",
    socketId: ""
};

function defineUsername(player) {
    let user = document.querySelector("#set-username").value;
    if (user == "") 
        player.username = "Guest";
    else 
        player.username = user;
}

socket.on('setRoomId', (roomId) => {
    player.roomId = roomId;
});

function createRoom() {
    defineUsername(player);
    player.host = true;
    player.socketId = socket.id;
    socket.emit('playerData', player);
}

function displayRooms() {
    socket.emit('requestShowRooms', player);
}

function joinRoom(roomId) {
    defineUsername(player);
    player.roomId = roomId;
    player.host = false;
    player.socketId = socket.id;
    socket.emit('playerData', player);
}

function quitRoomsPage() {
    roomList.innerHTML = "";
    roomMenu.style.display = "none";
}

socket.on('showRooms', (rooms) => {
    roomMenu.style.display = "";

    const lenght = Object.keys(rooms).length;
    for (var i = 0; i < lenght; i++) {
        const nbPlayer = rooms[i].players.length;
        const addLi = `<li>${rooms[i].players[0].username} Room   ${nbPlayer}/${maxPlayer} 
            <input type="button" value="JOIN" class="join-room-button" onclick="joinRoom('${String(rooms[i].id)}')"></li>`;
        roomList.innerHTML += addLi;
    }
});

socket.on('show your room', (room) => {
    gameMenu.style.display = "none";
    roomMenu.style.display = "none";
    tchat.style.display = "";       //C MOCHE !!!
    inRoom.style.display = "";
    playersInRoom.innerHTML = "";
    const lenght = Object.keys(room.players).length;
    if (!player.host)
        launchGame.style.display = "none";
    for (var i = 0; i < lenght; i++) {
        console.log(room);
        const addLi = `<li>${room.players[i].username}</li>`;
        playersInRoom.innerHTML += addLi;
    }
});

socket.on('write in tchat', (playerUsername, valueText) => {
    tchatText.innerHTML += `<p>${playerUsername} : ${valueText}</p>`;
});

socket.on('')

createRoomButton.addEventListener('click', createRoom);
displayRoomsButton.addEventListener('click', displayRooms);
quitRoomsMenu.addEventListener('click', quitRoomsPage);
formTchat.addEventListener('submit', (event) => {
    event.preventDefault();

    const valueText = formTchat.querySelector('#tchat-text-type').value;
    socket.emit('request tchat', player, valueText);
    formTchat.querySelector('#tchat-text-type').value = "";
});

playButton.addEventListener('click', () => {
    socket.emit('start game request', player);
});


// const menu = document.getElementById("menu");
// const playGameButton = document.getElementById("play-game");
// const playGame = document.getElementById("game");

// const CANVAS_WIDTH = 300;
// const CANVAS_HEIGHT = 300;

// let canvasPlayer1;
// let ctxPlayer1;
// let canvasPlayer2;
// let ctxPlayer2;

// let player1;
// let player2;


// function selectHero(str) {
//     if (str == "DemonHero")
//         return (new DemonHero());
//     else if (str == "FireKnightHero")
//         return (new DemonHero());
//     else
//         console.log("error");
// }

// function animate(ctx, player)
// {
//     console.log(player.gameFrame);
//     ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//     let position = Math.floor(player.gameFrame / player.staggerFrames) % player.frames;
//     player.posX = player.spriteWidth * position;
//     ctx.drawImage(player.spriteSheet, player.posX, player.posY * player.spriteHeight,
//         player.spriteWidth, player.spriteHeight, 0, 0, player.spriteWidth, player.spriteHeight);
//     if (!player.isLoop && player.gameFrame > (player.frames * player.staggerFrames) - player.staggerFrames) {
//         player.gameFrame = 0;
//     }
//     else {
//         player.gameFrame++;
//         window.requestAnimationFrame(() => {
//             animate(ctx, player); 
//         });
//     }
// }

// function startGame() {
//     const hero = document.getElementById("select-hero").value;
//     const difficulty = document.getElementById("select-difficulty").value;

//     menu.style.display = "none";

//     canvasPlayer1 = document.createElement("canvas");
//     canvasPlayer1.classList.add("player1");
//     playGame.appendChild(canvasPlayer1);
//     ctxPlayer1 = canvasPlayer1.getContext('2d');
//     canvasPlayer1.width = CANVAS_WIDTH;
//     canvasPlayer1.height = CANVAS_HEIGHT; 
//     player1 = selectHero(hero);

//     canvasPlayer2 = document.createElement("canvas");
//     canvasPlayer2.classList.add("player2");
//     playGame.appendChild(canvasPlayer2);
//     ctxPlayer2 = canvasPlayer2.getContext('2d');
//     canvasPlayer2.width = CANVAS_WIDTH;
//     canvasPlayer2.height = CANVAS_HEIGHT;
//     player2 = selectHero(hero);

//     player1.idleAnim();
//     player2.idleAnim();
//     animate(ctxPlayer1, player1);
//     animate(ctxPlayer2, player2);
// }
