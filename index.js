const board = document.getElementById("game-board");
const scoreElement = document.getElementById("score");
const controlsArea = document.getElementById("controlsArea");
const overlay = document.getElementById("overlay");
const gameOverMsg = document.getElementById("gameOverMsg");
const playBtn = document.getElementById("play-btn");

const boardSize = 400;
const blockSize = 20;
let snake = [{ x: 100, y: 100 }];
let direction = "right";
let food = { x: 200, y: 200 };
let interval;
let score = 0;
let gameActive = false;

function createSnake() {
  document.querySelectorAll(".snake").forEach((el) => el.remove());
  snake.forEach((segment) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.left = `${segment.x}px`;
    snakeElement.style.top = `${segment.y}px`;
    snakeElement.classList.add("snake");
    board.appendChild(snakeElement);
  });
}

function moveSnake() {
  const head = { ...snake[0] };

  switch (direction) {
    case "up":
      head.y -= blockSize;
      break;

    case "down":
      head.y += blockSize;
      break;

    case "right":
      head.x += blockSize;
      break;

    case "left":
      head.x -= blockSize;
      break;
  }

  if (
    head.x <= 0 ||
    head.x >= boardSize ||
    head.y <= 0 ||
    head.y >= boardSize ||
    snake.some((segment) => segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(interval)
    gameActive = true;
    overlay.classList.toggle("hidden");
    controlsArea.classList.toggle("active");
    gameOverMsg.textContent = "Game Over";
    playBtn.textContent = "Restart";
    return;
  }

  snake.unshift(head);
  if (head.x === food.x && head.y === head.y) {
    score += 10;
    scoreElement.textContent = `Score:${score}`;
    food = generateFood();
  } else {
    snake.pop();
  }

  createFood();
  createSnake();
}

function createFood() {
  let existingFood = document.querySelector("#food");
  if (existingFood) existingFood.remove();

  const foodElement = document.createElement("div");
  foodElement.style.left = `${food.x}px`;
  foodElement.style.top = `${food.y}px`;
  foodElement.setAttribute("id", "food");
  board.appendChild(foodElement);
}

function generateFood() {
  let x;
  let y;

  do {
    x = Math.floor((Math.random() * (((boardSize/blockSize)-2)+ 1)) * blockSize);
    y = Math.floor((Math.random() * (((boardSize/blockSize)-2)+ 1)) * blockSize);

  } while (snake.some((segment) => segment.x === x && segment.y === y));

  return { x, y };
}

function changeDirection(newDirction) {
  if (
    (newDirction === "up" && newDirction !== "down") ||
    (newDirction === "down" && newDirction !== "up") ||
    (newDirction === "left" && newDirction !== "right") ||
    (newDirction === "right" && newDirction !== "left")
  ) {
    direction = newDirction;
  }
}

window.addEventListener("key", e => changeDirection(e.key))

function startGame(){
    snake = [{ x: 100, y: 100 }];
    direction = "right";
    food = generateFood();
    score = 0;
    gameActive = true;
    scoreElement.textContent = `Score ${score}`
    overlay.classList.toggle("hidden");
    controlsArea.classList.toggle("active")
    clearInterval(interval)
    interval = setInterval(moveSnake,400)
}