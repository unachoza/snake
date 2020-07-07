const checkDidSnakeDie = () => {
  gameOver = outsideOfGride(getSnakeHeade()) || snakeCollidesWithItself();
};
const outsideOfGride = (position) => {
  return position.x < 1 || position.x > GRID_SIZE || position.y < 1 || position.y > GRID_SIZE;
};
const snakeCollidesWithItself = () => checkIsSnakeEating(snakeHead, snakeBody);
window.requestAnimationFrame(main);
