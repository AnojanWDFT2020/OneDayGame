let life = 1;
var enemyYPositions = [];
var enemyXPositions = [];
var enemyImage;
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
let keys = "";
let player = {
  x: 600,
  y: 500,
  width: 90,
  height: 90,
  frameX: 0,
  frameY: 0,
  speed: 9,
  moving: false,
};

let counter = 0;
setInterval(function () {
  counter++;
}, 100);

enemyImage = new Image();
enemyImage.src = "./images/batcorona.png";
const playerSprite = new Image();
playerSprite.src = "./images/character.png";

let interval;

function setUpGame() {
  interval = setInterval(function () {
    movePlayer();
    handlePlayerFrame();
    handleTick();
    checkCollision();
    drawSprite(
      playerSprite,
      player.width * player.frameX,
      player.height * player.frameY,
      player.width,
      player.height,
      player.x,
      player.y,
      player.width,
      player.height
    );
  }, 15);
}

function handleTick() {
  var currentEnemyNumber = 0;
  var numberOfEnemies = enemyXPositions.length;

  if (Math.random() < 1 / 20) {
    enemyYPositions.push(0);
    enemyXPositions.push(Math.random() * 1270);
  }

  while (currentEnemyNumber < numberOfEnemies) {
    enemyYPositions[currentEnemyNumber] =
      enemyYPositions[currentEnemyNumber] + 1;
    currentEnemyNumber = currentEnemyNumber + 1;
  }

  canvas.width = 1270;
  canvas.height = 630;

  currentEnemyNumber = 0;
  while (currentEnemyNumber < numberOfEnemies) {
    canvas
      .getContext("2d")
      .drawImage(
        enemyImage,
        enemyXPositions[currentEnemyNumber],
        enemyYPositions[currentEnemyNumber]
      );
    currentEnemyNumber = currentEnemyNumber + 1;
  }
}

function checkCollision() {
  var currentEnemyNumber = 0;
  var numberOfEnemies = enemyXPositions.length;
  while (currentEnemyNumber < numberOfEnemies) {
    if (
      ((player.x < enemyXPositions[currentEnemyNumber] &&
        enemyXPositions[currentEnemyNumber] < player.x + 30) ||
        (enemyXPositions[currentEnemyNumber] < player.x &&
          player.x < enemyXPositions[currentEnemyNumber] + 30)) &&
      ((player.y < enemyYPositions[currentEnemyNumber] &&
        enemyYPositions[currentEnemyNumber] < player.y + 33) ||
        (enemyYPositions[currentEnemyNumber] < player.y &&
          player.y < enemyYPositions[currentEnemyNumber] + 30))
    ) {
      alert(`GAME OVER !!! \nYou scored ${counter} points\n`);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      document.location.reload();
      clearInterval(interval);
    }
    currentEnemyNumber += 1;
  }
}

let request;

function drawScores(text, x, y) {
  ctx.font = "30px Roboto";
  ctx.strokeStyle = "white";
  ctx.lineWidth = 5;
  ctx.strokeText(text, x, y);
  ctx.fillStyle = "green";
  ctx.fillText(text, x, y);
}

function animate() {
  request = requestAnimationFrame(animate);
  drawScores(`Score: ${counter}`, 30, 50);
}

window.onload = function () {
  animate();
};

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

window.addEventListener("keydown", function (e) {
  if ((keys = e.code)) {
    player.moving = true;
  }
});

document.addEventListener("keyup", (e) => {
  if ((keys = e.code && "keyup")) {
    player.moving = false;
  }
});

function movePlayer() {
  if (keys === "ArrowUp" && player.y > 0) {
    player.y -= player.speed;
    player.frameY = 3;
    return (player.moving = true);
  } else if (keys === "ArrowLeft" && player.x > 0) {
    player.x -= player.speed;
    player.frameY = 1;
    return (player.moving = true);
  } else if (keys === "ArrowDown" && player.y < canvas.height - player.height) {
    player.y += player.speed;
    player.frameY = 0;
    return (player.moving = true);
  } else if (keys === "ArrowRight" && player.x < canvas.width - player.width) {
    player.x += player.speed;
    player.frameY = 2;
    return (player.moving = true);
  } else if (keys === "ArrowRight" && player.x < canvas.width - player.width) {
    player.x += player.speed;
    player.frameY = 2;
    return (player.moving = true);
  } else {
    player.moving = false;
  }
}

function handlePlayerFrame() {
  if (player.frameX < 7 && player.moving) {
    player.frameX++;
  } else player.frameX = 0;
}

setUpGame();
