let lastRenderTime = 0;
const SNAKE_SPEED = 1;
const gameBoard = document.getElementById('game-board');

//game loop function
const main = (currentTime) => {
  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
  lastRenderTime = currentTime;

  update();

  draw(gameBoard);
};

const snakeBody = [
  { x: 10, y: 11 },
  { x: 11, y: 11 },
  { x: 12, y: 11 },
  { x: 13, y: 11 },
  { x: 14, y: 11 },
];

const update = () => {
  // getUserInputDirection();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    //createing a duplicate snake moves fwd one
    snakeBody[i + 1] = { ...snakeBody[i] };
  }
  snakeBody[0].x += 0;
  snakeBody[0].y += 1;
};

const draw = (gameBoard) => {
  gameBoard.innerHTML = '';
  snakeBody.forEach((segment) => {
    let snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add('snake');
    gameBoard.appendChild(snakeElement);
  });
};

let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };

window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      inputDirection = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
      inputDirection = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
      inputDirection = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
      inputDirection = { x: 1, y: 0 };
      break;
  }
});

const userInputDirection = () => {
  lastInputDirection = inputDirection;
  return inputDirection;
};

window.requestAnimationFrame(main);
