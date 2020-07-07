let lastRenderTime = 0;
const SNAKE_SPEED = 1;

const main = (currentTime) => {
  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
  console.log('render');
  lastRenderTime = currentTime;
};

window.requestAnimationFrame(main);
