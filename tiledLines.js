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
const step = 10;

const draw = (x, y, width, height) => {
  const isLeftToRight = Math.random() > 0.5;

  ctx.beginPath();
  if (isLeftToRight) {
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y + height);
  } else {
    ctx.moveTo(x + width, y);
    ctx.lineTo(x, y + height);
  }
  ctx.strokeStyle = `hsl(${random.pick(hues)}, 95%, 50%)`;
  ctx.lineWidth = 2;
  ctx.stroke();
};

const hues = [
  lerp(0, 360, Math.random()),
  lerp(0, 360, Math.random()),
  lerp(0, 360, Math.random()),
];

function init() {
  // ctx.rect(0, 0, width, height);
  // ctx.strokeStyle = "#000";
  // ctx.stroke();

  for (let x = 0; x < width; x += step) {
    for (let y = 0; y < height; y += step) {
      draw(x, y, step, step);
    }
  }
}

init();
