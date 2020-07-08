const random = require("canvas-sketch-util/random");
const palletes = require("nice-color-palettes");
const { range } = require("canvas-sketch-util/random");
const pallete = random.pick(palletes);

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const color = "red";
// random.pick(pallete);
// const count = 40;

let radius = 200;
const radiusPoint = 1;
const angleIncrPrimary = 20;
const angleIncrSecondary = 2;

let circles = [];
ctx.canvas.width = innerWidth;
ctx.canvas.height = innerHeight;

let width = innerWidth;
let height = innerHeight;

let centerX = width / 2;
let centerY = height / 2;

window.addEventListener("resize", () => {
  let width = innerWidth;
  let height = innerHeight;
  ctx.canvas.width = width;
  ctx.canvas.height = height;
  init();
});

function Circle(x, y, radius, radiusPoint, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.radiusPoint = radiusPoint;
  const points = [];

  for (let i = 0; i < 360; i += angleIncrSecondary) {
    const rad = (i * Math.PI) / 180;
    const _x = x + radius * Math.cos(rad);
    const _y = y + radius * Math.sin(rad);
    const xC = centerX;
    const yC = centerY;
    const dX = _x - xC;
    const dY = _y - yC;

    const d = Math.sqrt(dX * dX + dY * dY);
    if (d < radius) {
      points.push([_x, _y]);
    }
  }
  this.points = points;
}
Circle.prototype.draw = function () {
  this.points.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, this.radiusPoint, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  });
};
Circle.prototype.update = function () {
  // this.points = this.points.map(([x, y]) => {
  //   const xP = x * Math.cos(0.01) - y * Math.sin(0.01);
  //   const yP = x * Math.sin(0.01) + y * Math.cos(0.01);
  //   return [xP, yP];
  // });
  this.draw();
  // this.points.forEach(([x, y]) => {
  //   ctx.beginPath();
  //   ctx.arc(x, y, this.radiusPoint, 0, Math.PI * 2, false);
  //   ctx.fillStyle = this.color;
  //   ctx.fill();
  // });
};

Circle.prototype.updateCoords = function (x, y) {
  this.x = x;
  this.y = y;
};

function init() {
  const centerPoints = [];
  circles = [];

  for (let i = 0; i < 360; i += angleIncrPrimary) {
    const rad = (i * Math.PI) / 180;
    const _x = centerX + radius * Math.cos(rad);
    const _y = centerY + radius * Math.sin(rad);
    centerPoints.push([_x, _y]);
  }
  centerPoints.forEach(([x, y], i) => {
    const circle = new Circle(
      x,
      y,
      radius,
      radiusPoint,
      // pallete[i % pallete.length]
      color
    );
    circles.push(circle);
  });
}
function rotate() {
  // radius += 0.1;
  init();
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, width, height);
  // ctx.save();
  // ctx.translate(centerX, centerY);
  rotate();
  circles.forEach((c) => c.update());

  // ctx.rotate(0.1);
  // ctx.restore();
}
init();
animate();
