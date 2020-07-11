//////USER MODIFY VARIABLES//////
let SNAKE_SPEED = 5;
let FOOD_OPTIONS = ['food-apple', 'food-cheese', 'food-mouse', 'food-nutella', 'food-carrot'];
/////////

let lastRenderTime = 0;
const snakeBody = [{ x: 10, y: 11 }];
const EXPANSION_RATE = 2;
const GRID_SIZE = 21;
const gameBoard = document.getElementById('game-board');
let gameOver = false;
let newSegments = 0;
let snakeHead;

const addElement = (element, adding) => {
  document.querySelector(element).classList.add(adding);
};
window.onload = function () {
  addElement('#start-popup', 'hide');
  addElement('#end-popup', 'hide');
  showPopup(document.querySelector('#start-popup'));
  // console.log(document.querySelector('#start-popup'));
};
//game loop function
const main = (currentTime) => {
  if (gameOver) {
    console.log('game is overrrr', gameOver);
    showPopup(document.querySelector('#end-popup'));
    return (gameOver = false);
  }

  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
  lastRenderTime = currentTime;

  update();
  draw(gameBoard);
};
////////game onboarding
const showPopup = (element) => {
  element.classList.remove('hide');
  element.classList.add('popup-open');
};
const hidePopup = (element) => {
  element.classList.add('hide');
  element.classList.remove('popup-open');
};
document.querySelector('#start-button').addEventListener('click', () => {
  startGame();
});
document.querySelector('#end-button').addEventListener('click', () => {
  resetGame();
});

document.querySelector('.faster-button').addEventListener('click', () => {
  SNAKE_SPEED = SNAKE_SPEED += 1;
  console.log('cliked faster button', SNAKE_SPEED);
});
document.querySelector('.food-button').addEventListener('click', () => {
  foodElement.classList.remove('food-apple');
  changeFood(FOOD_OPTIONS[2], foodElement);
  console.log('cliked food button', foodElement);
  drawFood(gameBoard, changeFood(FOOD_OPTIONS[2], foodElement));
  // foodElement.classList.add(FOOD_OPTIONS[2]);
});
const startGame = () => {
  hidePopup(document.querySelector('#start-popup'));
};
const resetGame = () => {
  gameOver = false;
  hidePopup(document.querySelector('#end-popup'));
  document.querySelector('#end-popup').classList.remove('popup-open');
  return (gameOver = false);
};
///////create game
const update = () => {
  updateSnake();
  updateFood();
  checkDidSnakeDie();
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
let food = { x: 3, y: 3 };

const drawFood = (gameBoard, newFoodImage = FOOD_OPTIONS[0]) => {
  foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add(newFoodImage);
  gameBoard.appendChild(foodElement);
  return foodElement;
};

const changeFood = (newFoodImage, currentfood) => {
  console.log(newFoodImage, currentfood);
  currentfood.classList.add(newFoodImage);
  return currentfood;
};

const updateFood = () => {
  if (checkIsSnakeEating(food, snakeBody)) {
    console.log('eating');
    expandSnake(EXPANSION_RATE);
    food = { x: 1, y: 1 };
    return updateFoodLocation(food, GRID_SIZE);
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
    // console.log(collisionDetection(segment, position));
    return collisionDetection(segment, position);
  });
};

const expandSnake = (amount) => {
  newSegments += amount;
  return growSnake();
};

const growSnake = () => {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }

  newSegments = 0;
  return snakeBody;
};
/////////// Winning Logic ////////
const checkDidSnakeDie = () => {
  gameOver = outsideOfGride(getSnakeHeade()) || snakeCollidesWithItself();
};
const outsideOfGride = (position) => {
  return position.x < 1 || position.x > GRID_SIZE || position.y < 1 || position.y > GRID_SIZE;
};
const getSnakeHeade = () => {
  return (snakeHead = snakeBody[0]);
};
const snakeCollidesWithItself = () => {
  checkIsSnakeEating(snakeHead, snakeBody);
};
window.requestAnimationFrame(main);
