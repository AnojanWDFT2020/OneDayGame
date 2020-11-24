const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

let keys = "";

const player = {
    x: 200,
    y: 300,
    width: 128,
    height: 128,
    frameX: [],
    frameY: [],
    speed: 9,
    moving: false
};

const playerSprite = new Image();
playerSprite.src = "./images/linkWalk.png"; 
const background = new Image();
background.src = "./images/background.png";

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

 window.addEventListener("keydown", function(e) {
    if (keys= e.code) {
        player.moving = true;
    } else {
        player.moving = false;
    }
 });

 function movePlayer() {

     if (keys=="ArrowUp" && player.y > 0) {
         player.y -= player.speed;
         player.frameY === 3;
         player.moving = true;
     }
     else if (keys=="ArrowLeft" && player.x > 0) {
         player.x -= player.speed;
         player.frameY === 1;
         player.moving = true;
     }
     else if (keys=="ArrowDown" && player.y < canvas.height - player.height) {
         player.y += player.speed;
         player.frameY === 0;
         player.moving = true;
     }
     else if (keys=="ArrowRight" && player.x < canvas.width - player.width) {
         player.x += player.speed;
         player.frameY === 2;
         player.moving = true;
     } else {
         player.moving = false;
     }
 }

 function handlePlayerFrame() {
     if (player.frameX < 3 && player.moving) player.frameX++;
     else player.frameX = 0;
 }

let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps) {
    fpsInterval = 1000/fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        drawSprite(playerSprite, (player.width * player.frameX), (player.height * player.frameY), player.width, player.height, player.x, player.y, player.width, player.height);
        movePlayer();
        handlePlayerFrame();
    }
}
startAnimating(20); 