const random = require("canvas-sketch-util/random");
const palletes = require("nice-color-palettes");
const { range } = require("canvas-sketch-util/random");
const { lerp } = require("canvas-sketch-util/math");
const math = require("canvas-sketch-util/math");
const pallete = random.shuffle(random.pick(palletes)).slice(0, 3);

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width = innerWidth;
ctx.canvas.height = innerHeight;

const colors = pallete;

let height = innerHeight - 50;

let width = height;
window.addEventListener("resize", () => {
  height = innerHeight;
  width = height;

  ctx.canvas.width = width;
  ctx.canvas.height = height;
  init();
});
const circles = [];
const minRadius = 2;
const maxRadius = width / 8;
const maxCircles = 1000;

let retries = 0;
const maxRetries = 10000;

const inCollision = (circle) => {
  let isExtended = false;
  if (circle.x + circle.radius >= width || circle.x - circle.radius <= 0) {
    isExtended = true;
  }
  if (circle.y + circle.radius >= height || circle.y - circle.radius <= 0) {
    isExtended = true;
  }
  if (isExtended) {
    return true;
  }

  const isColliding = circles.find((_circle) => {
    const { x: x1, y: y1, radius: radius1 } = circle;
    const { x: x2, y: y2, radius: radius2 } = _circle;

    const diffX = x2 - x1;
    const diffY = y2 - y1;

    return (
      Math.pow(diffX, 2) + Math.pow(diffY, 2) < Math.pow(radius1 + radius2, 2)
    );
  });
  //   console.log({ isColliding });
  return !!isColliding;
};

const insideAnotherCircle = (circle) => {
  const insideACircle = circles.find((_circle) => {
    const { x, y } = circle;

    const diffX = x - _circle.x;
    const diffY = y - _circle.y;
    const diff = Math.pow(diffX, 2) + diffY * diffY;
    return diff <= _circle.radius * _circle.radius;
  });
  return !!insideACircle;
};

const plotCircle = (circle) => {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
  ctx.strokeStyle = `hsl(${circle.color},90%,60%)`;
  ctx.stroke();
  ctx.fillStyle = `hsl(${circle.color},90%,60%)`;
  ctx.fill();
};

const makeCircle = (x, y, radius) => {
  //   if (retries >= 10) {
  //     return;
  //   }
  const isInside = insideAnotherCircle({ x, y });
  const isColliding = inCollision({ x, y, radius: radius + 0.25 });
  if (radius === minRadius && (isInside || isColliding)) {
    retries++;
    return;
  } else if (radius >= maxRadius || isColliding) {
    retries = 0;
    const color = lerp(0, 360, Math.random());
    // plotCircle({ x, y, radius, color });
    circles.push({ x, y, radius, color });
  } else {
    retries = 0;

    makeCircle(x, y, radius + 0.25);
  }
};
function init() {
  //   requestAnimationFrame(init);

  while (retries < maxRetries && circles.length < maxCircles) {
    const x = lerp(0, width, Math.random());
    const y = lerp(0, height, Math.random());
    makeCircle(x, y, minRadius);
    // init();
  }
}

function drawCircles() {
  circles.forEach((circle) => {
    ctx.beginPath();
    const color = lerp(0, 180, circle.radius / maxRadius);
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
    // ctx.strokeStyle = `hsl(${color},90%,50%)`;
    // ctx.stroke();
    ctx.fillStyle = `hsl(${color},90%,60%)`;
    ctx.fill();
  });
}
const test = () => {
  circles.push({ x: 50, y: 50, radius: 50 });
  //   circles.push({ x: 50, y: 90, radius: 50 });

  const isInside = insideAnotherCircle({ x: 50, y: 90 });
  const isColliding = inCollision({ x: 50, y: 90, radius: 50 });
  console.log({ isInside, isColliding });
};
init();
drawCircles();
