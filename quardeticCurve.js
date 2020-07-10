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

let height = innerHeight - 50;
let width = innerWidth - 50;
const margin = 10;

const grasses = [];
const grassCount = width * 0.43;
let sun;
let sky;
const stars = [];
const starCount = 100;

window.addEventListener("resize", () => {
  height = innerHeight;
  width = height;

  ctx.canvas.width = width;
  ctx.canvas.height = height;
  init();
});

function Grass(x, y, height) {
  this.x = x;
  this.y = y;
  this.height = height;
  this.radian = 10 + Math.sin(Math.random());
  const color = Math.sin(x) + 120;
  this.c = "hsl(" + color + ",90%,30%)";
}

Grass.prototype.draw = function () {
  ctx.beginPath();
  ctx.lineWidth = 1;
  const { x, y, radian, height, c } = this;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.PI);
  ctx.moveTo(0, 0);
  ctx.strokeStyle = c;

  const cpx = Math.cos(radian) * 5;
  const cpy = height / 2;
  ctx.quadraticCurveTo(cpx, cpy, Math.sin(radian) * 5, height);
  ctx.stroke();
  ctx.restore();
};

Grass.prototype.update = function () {
  this.radian += 0.03;
  this.draw();
};
function Sky() {
  this.hue = 180;
  this.sat = 90;
  this.light = 90;
}

function Star(x, y, luminanceLevel, radius) {
  this.x = x;
  this.y = y;
  this.luminanceLevel = luminanceLevel;
  this.radius = radius;
}
Star.prototype.draw = function drawStart() {
  if (sky.light < this.luminanceLevel) {
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
  }
};

Sky.prototype.draw = function drawSky() {
  ctx.beginPath();

  ctx.fillStyle = `hsl(${this.hue}, ${this.sat}%,${this.light}%)`;
  ctx.rect(0, 0, width, height);
  ctx.fill();
};
Sky.prototype.update = function updateSky() {
  this.light = lerp(0, 70, Math.abs(Math.sin(sun.x * 0.0019)));
  if (sun.x + 150 < 0 || sun.x - 150 > width) {
    this.light = 0;
  }
  this.draw();
};
function Sun(x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius;

  this.directionX = 2;
  // this.directionY = -0.5;
}
Sun.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = "hsl(40, 90%, 60%)";
  ctx.strokeStyle = "hsl(20, 90%, 50%)";
  ctx.lineWidth = 2;
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  ctx.stroke();
  ctx.fill();
};
Sun.prototype.update = function () {
  this.x = this.x + this.directionX;
  this.y = lerp(400, 50, Math.sin(this.x * 0.002));
  if (this.x > width + 500) {
    this.x = -500;
  }

  this.draw();
};

function init() {
  ctx.clearRect(0, 0, width * 2, height * 2);
  sky = new Sky();
  sun = new Sun(100, 300, 50);

  // const starCount = lerp(50, 100, Math.random());
  for (let i = 0; i < starCount; i++) {
    const x = lerp(10, width - margin, Math.random());
    const y = lerp(10, 300, Math.random());
    const radius = lerp(0.5, 2.5, Math.random());
    const lum = lerp(10, 20, Math.random());
    const star = new Star(x, y, lum, radius);
    stars.push(star);
  }

  for (let i = 0; i < grassCount; i++) {
    const x = lerp(margin, width - margin, i / (grassCount - 1));
    // const _height = lerp(180, 300, Math.random());
    const _height = 100 + Math.sin(i % 100) * 6;

    const grass = new Grass(x, height, _height);
    grasses.push(grass);
  }
  grasses.forEach((grass) => grass.draw());
}

function animate() {
  ctx.clearRect(0, 0, width * 2, height * 2);

  sky.update();
  stars.forEach((star) => star.draw());
  sun.update();

  grasses.forEach((grass) => grass.update());

  requestAnimationFrame(animate);
}

init();
animate();
