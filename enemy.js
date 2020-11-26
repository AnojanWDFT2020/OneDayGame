const canvas = document.getElementById('canvas2');
const ctx = canvas.getContext('2d');

let keys = "";

const enemy = {
    x: 700,
    y: 300,
    width: 128,
    height: 128,
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving: true,
};


const enemySprite = new Image();
enemySprite.src = "./images/bat.png";

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function handleEnemyFrame() {
    if (enemy.frameX < 4 && enemy.moving) {
        enemy.frameX++;
    }
    else enemy.frameX = 0;
}

let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimatingEnemy(fps) {
    fpsInterval = 1000/fps;
    then = Date.now();
    startTime = then;
    animateEnemy();
}

function animateEnemy() {
    requestAnimationFrame(animateEnemy);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        drawSprite(enemySprite, (enemy.width * enemy.frameX), (enemy.height * enemy.frameY), enemy.width, enemy.height, enemy.x, enemy.y, enemy.width, enemy.height);
        //moveEnemy();
        handleEnemyFrame();
    }
}
startAnimatingEnemy(9); 
