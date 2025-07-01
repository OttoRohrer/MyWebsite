const ball = document.querySelector("#ball");
const game = document.querySelector("#game");
const paddle = document.querySelector("#paddle");
const btn = document.querySelector("button");
const blocks = document.querySelectorAll(".block");
const boundingRect = game.getBoundingClientRect();
const blockData = [];
let y = 92;
let x = 48;
let xVelocity = -0.5;
let yVelocity = -0.5;
paddle.style.top = "96%";
paddle.style.left = "40%";
paddle.style.right = "60%";
const gap = 1.25;
const width = 12.32;
const height = 3.8;
const startingTop = 12.5;
const startingLeft = 10;
const XDifference = width + gap;
const YDifference = height + gap;
let paddleLeft = Number(paddle.style.left.replace("%", ""));
let blockXCounter = 0;
let blockYCounter = 0;
btn.style.opacity = "0";
for (let block of blocks) {
  if (blockXCounter % 6 === 0) {
    if (blockXCounter !== 0) {
      blockYCounter++;
    }
    blockXCounter = 0;
  }
  block.style.left = startingLeft + XDifference * blockXCounter + "%";
  block.style.top = startingTop + YDifference * blockYCounter + "%";
  blockData.push({
    x: Number(block.style.left.replace("%", "")),
    y: Number(block.style.top.replace("%", "")),
    active: true,
  });
  blockXCounter++;
}
window.addEventListener("pointermove", (event) => {
  if (
    game.style.background !== "darkred" &&
    game.style.background !== "green"
  ) {
    const offset =
      ((event.pageX - boundingRect.left) / boundingRect.width) * 100 - 10;
    if (event.pageX > boundingRect.right - 65) {
      paddle.style.left = `80%`;
      paddleLeft = 80;
      paddle.style.right = paddleLeft + 20 + "%";
      return;
    } else if (event.pageX < boundingRect.left + 65) {
      paddle.style.left = `0%`;
      paddleLeft = 0;
      paddle.style.right = paddleLeft + 20 + "%";
      return;
    }
    paddle.style.left = `${offset}%`;
    paddle.style.right = paddleLeft + 20 + "%";
    paddleLeft = Number(paddle.style.left.replace("%", ""));
  }
});
function gameLoop() {
  ball.style.top = `${y}%`;
  ball.style.left = `${x}%`;
  x += xVelocity;
  y += yVelocity;
  if (x < 0 || x >= 96) {
    xVelocity *= -1;
  }
  if (y <= 0) {
    yVelocity *= -1;
  }
  if (y >= 96) {
    btn.style.opacity = "1";
    btn.style.cursor = "pointer";
    game.style.background = "darkred";
    return;
  }
  if (y >= 92 && x >= paddleLeft && x <= paddleLeft + 20) {
    y = 92;
    const change = dealWithSpeedChange(x, xVelocity, yVelocity);
    xVelocity = change[0];
    yVelocity = change[1];
  }
  isBallTouchingAnyBlock(blockData, x, y);
  if (isWin(blockData)) {
    btn.style.opacity = "1";
    btn.style.cursor = "pointer";
    game.style.background = "green";
    return;
  }
  requestAnimationFrame(gameLoop);
}
function dealWithSpeedChange(x, xVelocity, yVelocity) {
  const center = x + 2;
  const percentDistanceFromCenter = (center - (paddleLeft + 10)) / 10;
  const sign = Math.sign(xVelocity);
  xVelocity = percentDistanceFromCenter;
  yVelocity = -1 * (Math.abs(percentDistanceFromCenter) + 0.5);
  if (Math.abs(yVelocity) > 2) {
    yVelocity = Math.sign(yVelocity) * 2;
  } else if (Math.abs(yVelocity) < 0.5) {
    yVelocity = Math.sign(yVelocity) * 0.5;
  }

  return [xVelocity, yVelocity];
}

function isBallTouchingAnyBlock(blocks, x, y) {
  let i = 0;
  for (let block of blocks) {
    if (isBallTouchingBlock(x, y, block, i)) {
      return true;
    }
    i++;
  }
  return false;
}

function isBallTouchingBlock(x, y, block, i) {
  const cx = x + 2;
  const cy = y + 2;
  if (cx >= block.x && cx <= block.x + width && block.active) {
    if (cy >= block.y && cy <= block.y + height) {
      blocks[i].style.opacity = "0";
      block.active = false;
      yVelocity *= -1;
      return true;
    }
  }
}

function isWin(blocks) {
  return blocks.every((block) => !block.active);
}

btn.addEventListener("click", (event) => {
  if (btn.style.opacity === "1") {
    window.location.reload(true);
  }
});
requestAnimationFrame(gameLoop);
