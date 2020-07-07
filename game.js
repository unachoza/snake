const SNAKE_SPEED = 1;

// const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
// if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

const main = (currentTime) => {
  window.requestAnimationFrame(main);
  console.log(currentTime);
};
// window.requestAnimationFrame(main);
