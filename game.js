let lastRenderTime = 0;
const SNAKE_SPEED = 1;
const gameBoard = document.getElementById('game-board');

//game loop function
const main = (currentTime) => {
  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
  console.log('render');
  lastRenderTime = currentTime;

  update();

  draw(gameBoard);
};

const snakeBody = [
  { x: 10, y: 11 },
  { x: 11, y: 11 },
  { x: 12, y: 11 },
];

const update = () => {
  console.log('update snake');
};

const draw = (gameBoard) => {
  snakeBody.forEach((segment) => {
    let snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = segment.x;
    snakeElement.style.gridColumnStart = segment.y;
    snakeElement.classList.add('snake');
    gameBoard.appendChild(snakeElement);
  });
};

window.requestAnimationFrame(main);
