const random = require("canvas-sketch-util/random");
const palletes = require("nice-color-palettes");
const { range } = require("canvas-sketch-util/random");
const { lerp } = require("canvas-sketch-util/math");
const pallete = random.shuffle(random.pick(palletes)).slice(0, 3);

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width = innerWidth;
ctx.canvas.height = innerHeight;

const colors = pallete;

let width = innerWidth - 100;
let height = innerHeight - 100;
const margin = 20;
window.addEventListener("resize", () => {
  width = innerWidth;
  height = innerHeight;
  ctx.canvas.width = width;
  ctx.canvas.height = height;
  init();
});
const count = 40;
const getGridPoints = () => {
  const gridPoints = [];
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      const u = i / (count - 1);
      const v = j / (count - 1);
      gridPoints.push({ position: [u, v] });
    }
  }
  return gridPoints;
};
function init() {
  ctx.rect(0, 0, width, height);
  //   ctx.strokeStyle = random.pick(pallete);
  //   ctx.stroke();

  const gridPoints = getGridPoints();

  const dx = lerp(0, width, 1 / (count - 1));
  const dy = lerp(0, height, 1 / (count - 1));

  console.log({ dx, dy });
  //   .filter(() => Math.random() > 0.5);
  console.log({ gridPoints });
  gridPoints.forEach(({ position }) => {
    const [u, v] = position;

    const x = lerp(margin, width, u);
    const y = lerp(margin, height, v);
    const isVerticle = random.value() > 0.5;

    ctx.beginPath();
    ctx.moveTo(x, y);
    console.log({ isVerticle });
    if (isVerticle) {
      ctx.lineTo(x, y + dy);
    } else {
      ctx.lineTo(x + dx, y);
    }
    ctx.strokeStyle = "#000000";
    ctx.stroke();
  });
}

init();
