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
    const row = [];
    for (let j = 0; j < count; j++) {
      const u = i / (count - 1);
      const v = j / (count - 1);
      row.push({ position: [v, u] });
    }
    gridPoints.push(row);
  }
  return gridPoints;
};
function init() {
  ctx.rect(0, 0, width, height);

  const gridPoints = getGridPoints();

  gridPoints.forEach((row, i) => {
    for (let column = 0; column < row.length; column += 2) {
      const point = row[column];
      const { position } = point;
      const isTop = Math.random() > 0.5;

      const dy =
        Math.min((1 / count) * 0.3, Math.random() * (1 / count) * 0.3) *
        (i * column * 0.001);
      console.log({ dy });
      if (isTop) {
        position[1] = position[1] - dy;
      } else {
        position[1] = position[1] + dy;
      }
    }
  });
  for (let row = 0; row < gridPoints.length; row++) {
    const points = gridPoints[row];
    for (let column = 1; column < points.length; column++) {
      const point1 = points[column - 1];
      const point2 = points[column];

      const x1 = lerp(margin, width, point1.position[0]);
      const y1 = lerp(margin, height, point1.position[1]);

      const x2 = lerp(margin, width, point2.position[0]);
      const y2 = lerp(margin, height, point2.position[1]);
      console.log({ x1, y1, x2, y2 });

      ctx.beginPath();
      ctx.strokeStyle = "#000";
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      // ctx.beginPath();
      // ctx.fillStyle = "#000";
      // ctx.arc(x1, y1, 5, 0, Math.PI * 2, false);
      // ctx.fill();
      // ctx.stroke();
    }
  }
}

init();
