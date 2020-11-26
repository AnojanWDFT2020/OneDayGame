const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');


let keys = "";

const player = {
    x: 400,
    y: 200,
    width: 128,
    height: 128,
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving: false,
};

const playerSprite = new Image();
playerSprite.src = "./images/linkWalk.png"; 

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

 window.addEventListener("keydown", function(e) {
     if (keys= e.code) {
         player.moving = true;
     }
 });

 document.addEventListener('keyup', (e) => {
     if (keys= e.code && "keyup") {
         player.moving = false;
     }
 });

 function movePlayer() {
    if (keys==="ArrowUp" && player.y > 0) {
         player.y -= player.speed;
         player.frameY = 3;
         return player.moving = true;
    }
    else if (keys==="ArrowLeft" && player.x > 0) {
         player.x -= player.speed;
         player.frameY = 1;
         return player.moving = true;
    }
    else if (keys==="ArrowDown" && player.y < canvas.height - player.height) {
         player.y += player.speed;
         player.frameY = 0;
         return player.moving = true;
    }
    else if (keys==="ArrowRight" && player.x < canvas.width - player.width) {
         player.x += player.speed;
         player.frameY = 2;
         return player.moving = true;
    } 
    else if (keys==="ArrowRight" && player.x < canvas.width - player.width) {
         player.x += player.speed;
         player.frameY = 2;
         return player.moving = true;

    }
    else {
         player.moving = false;
    }
}


function handlePlayerFrame() {
    if (player.frameX < 7 && player.moving) {
        player.frameX++;
    }
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
        drawSprite(playerSprite, (player.width * player.frameX), (player.height * player.frameY), player.width, player.height, player.x, player.y, player.width, player.height);
        movePlayer();
        handlePlayerFrame();
    }
}

startAnimating(20); 

