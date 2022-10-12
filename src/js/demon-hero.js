class DemonHero
{
    constructor() {
        this.heal = 100;
        this.damageAttackBase = 10;

        /*          ANIM        */
        this.gameFrame = 0;
        this.spriteSheet = new Image();
        this.spriteSheet.src = "img/demon-288x160-spritesheet.png";
        this.spriteWidth = 288;
        this.spriteHeight = 160;
        this.idle = [10, 5, 0, 0, true];
        this.attack = [10, 14, 0, 2, false];
        this.death = [10, 22, 0, 4, false];

        this.staggerFrames = 10;
        this.frames = 5;
        this.posX = 0;
        this.posY = 0;
        this.isLoop = true;
    }

    idleAnim() {
        this.staggerFrames = 10;
        this.frames = 5;
        this.posX = 0;
        this.posY = 0;
        this.isLoop = true;
    }

    attackAnim() {
        this.staggerFrames = 10;
        this.frames = 14;
        this.posX = 0;
        this.posY = 2;
        this.isLoop = false;
    }

    deathAnim() {
        this.staggerFrames = 10;
        this.frames = 22;
        this.posX = 0;
        this.posY = 4;
        this.isLoop = false;
    }
}

// const canvas = document.getElementById('demon-hero');
// const ctx = canvas.getContext('2d');
// const CANVAS_WIDTH = canvas.width = 300;
// const CANVAS_HEIGHT = canvas.height = 300;

// const playerImage = new Image();
// playerImage.src = "img/demon-288x160-spritesheet.png";
// const spriteWidth = 288;
// const spriteHeight = 160;

// let is_anime = true;
// let is_loop = true;
// let frameX = 0;
// let frameY = 0;
// let gameFrame = 0;
// let nbFrameAnimation = 5;
// const staggerFrames = 10;

// function demonIdle()
// {
//     is_loop = true;
//     nbFrameAnimation = 5;
//     gameFrame = 0;
//     frameY = 0;
// }

// function waitEndAnimation()
// {
//     if (is_anime == true) {
//         setTimeout(waitEndAnimation, 100);
//     }
//     else {
//         is_anime = true;
//         animate();
//         demonIdle();
//     }
// }

// function demonAttackAnmation()
// {
//     is_loop = false;
//     nbFrameAnimation = 14;
//     gameFrame = 0;
//     frameY = 2;
//     waitEndAnimation();
// }

// function demonDeathAnimation()
// {
//     is_loop = false;
//     nbFrameAnimation = 22;
//     gameFrame = 0;
//     frameY = 4;
// }

// animate();

// document.addEventListener("click", demonDeathAnimation);