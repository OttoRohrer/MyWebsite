const game = document.querySelector("#game");
let snakePieces = document.querySelectorAll(".snakePart");
const white = document.querySelector(".apple");
const snakeData = [];
let frameCounter = 0;
const minBoundary = 4;
const maxBoundary = 72;
const snakeLeft = 36;
const positioningDifference = 4;
let currentApple = generateApple();
let i = 0;
let direction = "left";
window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown") {
    direction = "down";
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    direction = "up";
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    direction = "right";
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    direction = "left";
  }
});

for (const piece of snakePieces) {
  piece.style.top = "36vmin";
  piece.style.left = `${snakeLeft + positioningDifference * i}vmin`;
  piece.style.background = "black";
  snakeData.push({
    x: Number(piece.style.left.replace("vmin", "")),
    y: Number(piece.style.top.replace("vmin", "")),
  });
  i++;
}

function getFutureHeadPosition(head) {
  if (direction === "left") {
    return [head.x - 4, head.y];
  }
  if (direction === "right") {
    return [head.x + 4, head.y];
  }
  if (direction === "up") {
    return [head.x, head.y - 4];
  }
  if (direction === "down") {
    return [head.x, head.y + 4];
  }
}

function generateApplePosition() {
  return [
    Math.floor(Math.random() * 20) * 4,
    Math.floor(Math.random() * 20) * 4,
  ];
}

function generateApple() {
  const apple = document.createElement("div");
  const coordinates = generateApplePosition();
  // log(coordinates)
  const x = coordinates[0];
  const y = coordinates[1];
  apple.classList.add("apple");
  game.appendChild(apple);
  apple.style.left = x + "vmin";
  apple.style.top = y + "vmin";
  return apple;
}

function areWeDead(head) {
  if (head.x > maxBoundary && direction === "right") {
    return true;
  }
  if (head.x < minBoundary && direction === "left") {
    return true;
  }
  if (head.y > maxBoundary && direction === "down") {
    return true;
  }
  if (head.y < minBoundary && direction === "up") {
    return true;
  }
  const futureX = getFutureHeadPosition(head)[0];
  const futureY = getFutureHeadPosition(head)[1];
  for (let i = 1; i < snakeData.length; i++) {
    if (futureX === snakeData[i].x && futureY === snakeData[i].y) {
      return true;
    }
  }
  return false;
}

function moveHead(head) {
  if (direction === "left") {
    head.x -= 4;
  }
  if (direction === "right") {
    head.x += 4;
  }
  if (direction === "up") {
    head.y -= 4;
  }
  if (direction === "down") {
    head.y += 4;
  }
  return head;
}
function moveSnake(snake) {
  for (let i = snake.length - 1; i > 0; i--) {
    snake[i].x = snake[i - 1].x;
    snake[i].y = snake[i - 1].y;
  }
  return snake;
}
function renderSnake(snake) {
  let i = 0;
  for (let piece of snakePieces) {
    piece.style.left = snake[i].x + "vmin";
    piece.style.top = snake[i].y + "vmin";
    piece.style.background = "black";
    i++;
  }
}

function eatWhite(head, white) {
  const whiteLeft = Number(white.style.left.replace("vmin", ""));
  const whiteTop = Number(white.style.top.replace("vmin", ""));
  // log(whiteLeft, whiteTop, head.x, head.y)
  if (whiteLeft === head.x && whiteTop === head.y) {
    white.style.opacity = "0";
    const newBack = document.createElement("div");
    newBack.classList.add("snakePart");
    game.appendChild(newBack);
    snakeData.push({
      x: snakeData[snakeData.length - 1].x,
      y: snakeData[snakeData.length - 1].y,
    });
    snakePieces = document.querySelectorAll(".snakePart");
    currentApple = generateApple();
    log(currentApple);
  }
}
function gameLoop() {
  if (frameCounter % 20 === 0) {
    if (areWeDead(snakeData[0])) {
      game.style.background = "darkred";
      return;
    }
    moveSnake(snakeData);
    moveHead(snakeData[0]);
    renderSnake(snakeData);
    eatWhite(snakeData[0], currentApple);
  }

  frameCounter++;
  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
