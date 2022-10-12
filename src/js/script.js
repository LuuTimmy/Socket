const socket = io();
const maxPlayer = 2;
const createRoomButton = document.querySelector("#create-room");
const joinRoomButton = document.querySelector("#join-room");
const gameMenu = document.querySelector("#game-menu");
const roomList = document.querySelector("#rooms-list");
const roomMenu = document.querySelector("#rooms-menu");
roomMenu.style.display = "none";
const quitRoomsMenu = document.querySelector("#quit-rooms-menu");

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

function createRoom() {
    defineUsername(player);
    player.host = true;
    player.socketId = socket.id;
    socket.emit('playerData', player);
}

function joinRoom() {
    defineUsername(player);
    player.host = false;
    player.socketId = socket.id;
    socket.emit('requestShowRoom', player);
}

function quitRoomPage() {
    roomList.innerHTML = "";
    roomMenu.style.display = "none";
}

socket.on('showRoom', (rooms) => {
    roomMenu.style.display = "";
    const lenght = Object.keys(rooms).length;
    for(var i = 0; i < lenght; i++) {
        const nbPlayer = Object.keys(rooms[i].players).length;
        const addLi = `<li>RoomId = ${rooms[i].id}   ${nbPlayer}/${maxPlayer} <input type="button" value="JOIN" class="join-button"></li>`;
        roomList.innerHTML += addLi;
    }
});

createRoomButton.addEventListener('click', createRoom);
joinRoomButton.addEventListener('click', joinRoom);
quitRoomsMenu.addEventListener('click', quitRoomPage);


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
