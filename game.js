let lastRenderTime = 0;
const snakeBody = [{ x: 10, y: 11 }];
const SNAKE_SPEED = 3;
const EXPANSION_RATE = 2;
const gameBoard = document.getElementById('game-board');
let newSegments = 0;

//game loop function
const main = (currentTime) => {
  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
  lastRenderTime = currentTime;

  update();
  draw(gameBoard);
};

const update = () => {
  updateSnake();
  updateFood();
};

const draw = () => {
  gameBoard.innerHTML = '';
  drawSnake(gameBoard);
  drawFood(gameBoard);
};

////////SNAKE//////
const drawSnake = (gameBoard) => {
  gameBoard.innerHTML = '';
  snakeBody.forEach((segment) => {
    let snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add('snake');
    gameBoard.appendChild(snakeElement);
  });
};

const updateSnake = () => {
  const inputDirection = userInputDirection();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    //createing a duplicate snake moves fwd one
    snakeBody[i + 1] = { ...snakeBody[i] };
  }
  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
};

//////////// USER //////////
let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };

window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      if (lastInputDirection.y !== 0) break;
      inputDirection = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
      if (lastInputDirection.y !== 0) break;
      inputDirection = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
      if (lastInputDirection.x !== 0) break;
      inputDirection = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
      if (lastInputDirection.x !== 0) break;
      inputDirection = { x: 1, y: 0 };
      break;
  }
});

const userInputDirection = () => {
  lastInputDirection = inputDirection;
  return inputDirection;
};

/////SNAKE EATS FOOD ////
let food = { x: 1, y: 1 };

const drawFood = (gameBoard) => {
  const foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food');
  gameBoard.appendChild(foodElement);
};

const updateFood = () => {
  if (checkIsSnakeEating(food, snakeBody)) {
    console.log('eating');
    expandSnake(EXPANSION_RATE);
    food = { x: 1, y: 1 };
    return updateFoodLocation(food, 21);
  }
};
const updateFoodLocation = (food, gameSize) => {
  food.x = Math.floor(Math.random() * Math.floor(gameSize));
  food.y = Math.floor(Math.random() * Math.floor(gameSize));
  console.log(food);
  return food;
};
const collisionDetection = (position1, position2) => {
  return position1.x === position2.x && position1.y === position2.y;
};

const checkIsSnakeEating = (position, snakebody) => {
  return snakebody.some((segment) => {
    console.log(collisionDetection(segment, position));
    return collisionDetection(segment, position);
  });
};

const expandSnake = (amount) => {
  newSegments += amount;
};

const growSnake = () => {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }

  newSegments = 0;
};

window.requestAnimationFrame(main);
