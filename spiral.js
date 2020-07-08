const random = require("canvas-sketch-util/random");
const { lerp } = require("canvas-sketch-util/math");
const palletes = require("nice-color-palettes");
const { range } = require("canvas-sketch-util/random");
const bezierEasing = require("bezier-easing");

const bazierFn = bezierEasing(0.23, 0.6, 0.91, 0.65);
// let pallete = random.pick(palletes);

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// const color = random.pick(pallete);

let pallete = [
  // "#E50064",
  // "#E40262",
  // "#E30460",
  // "#E3075E",
  // "#E2095D",
  // "#E10B5B",
  // "#E10E59",
  // "#E01058",
  // "#DF1256",
  // "#DF1554",
  // "#DE1753",
  // "#DD1951",
  // "#DD1C4F",
  // "#DC1E4D",
  // "#DB204C",
  "#DB234A",
  "#DA2548",
  "#DA2747",
  "#D92A45",
  "#D82C43",
  "#D82E42",
  "#D73140",
  "#D6333E",
  "#D6353D",
  "#D5383B",
  "#D43A39",
  "#D43C37",
  "#D33F36",
  "#D24134",
  "#D24332",
  "#D14631",
  "#D1482F",
  "#D04A2D",
  "#CF4D2C",
  "#CF4F2A",
  "#CE5128",
  "#CD5426",
  "#CD5625",
  "#CC5823",
  "#CB5B21",
  "#CB5D20",
  "#CA5F1E",
  "#C9621C",
  "#C9641B",
  "#C86619",
  "#C86917",
  "#C76B16",
  "#C66D14",
  "#C67012",
  "#C57210",
  "#C4740F",
  "#C4770D",
  // "#C3790B",
  // "#C27B0A",
  // "#C27E08",
  // "#C18006",
  // "#C08205",
  // "#C08503",
  // "#BF8701",
  // "#BF8A00",
];

const reveres = [...pallete].reverse();
pallete = [...pallete, ...reveres];

// const count = 40;

let radius = 300;
const radiusPoint = 2;
const angleIncrPrimary = 60;
const angleIncrSecondary = 0.5;

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
    if (d <= radius) {
      points.push([_x, _y]);
    }
  }
  this.points = points;
}
Circle.prototype.draw = function () {
  this.points.forEach(([x, y], i) => {
    ctx.beginPath();

    ctx.arc(x, y, this.radiusPoint, 0, Math.PI * 2, false);

    const c = pallete[i % pallete.length];

    ctx.fillStyle = c;
    ctx.fill();
  });
};
Circle.prototype.update = function () {
  this.draw();
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

  const rad =
    (1 + Math.abs(Math.sin(frames * Math.PI * 2 * 0.001))) * radius * 0.5;
  console.log({ rad });

  const max = 300;
  const min = 173;

  const p = bazierFn(Math.abs(Math.sin(frames * 0.005)));

  centerPoints.forEach(([x, y], i) => {
    const circle = new Circle(
      x,
      y,

      lerp(min, max, p),

      // i * 10,
      radiusPoint,
      pallete[i % pallete.length]
      // color
    );
    circles.push(circle);
  });
}

let frames = 0;

function rotate() {
  frames++;
  const p = pallete[0];
  pallete = pallete.slice(1, pallete.length);
  pallete.push(p);

  init();
  // }
}

function animate() {
  requestAnimationFrame(animate);

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, width, height);
  // ctx.save();
  // ctx.translate(centerX, centerY);
  rotate();
  circles.forEach((c) => c.update());

  // ctx.rotate(0.1);
  // ctx.restore();
}
init();
animate();
