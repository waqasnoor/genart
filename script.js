const random = require("canvas-sketch-util/random");
const palletes = require("nice-color-palettes");
const { range } = require("canvas-sketch-util/random");
const pallete = random.pick(palletes);

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width = innerWidth;
ctx.canvas.height = innerHeight;

const colors = pallete;

// const colors = ["#fff"];

const count = 40;
let width = innerWidth - 20;
let height = innerHeight - 20;
window.addEventListener("resize", () => {
  let width = innerWidth - 20;
  let height = innerHeight - 20;
  ctx.canvas.width = width;
  ctx.canvas.height = width;
  init();
});

function Particle(x, y, size, directionX, directionY, color) {
  this.x = x;
  this.y = y;
  this.directionX = directionX;
  this.directionY = directionY;
  this.size = size;
  this.color = color;
  this.friends = [];
}

Particle.prototype.draw = function draw() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
  ctx.fillStyle = this.color;
  ctx.fill();
  for (let i = 0; i < this.friends.length; i++) {
    const friend = this.friends[i];
    if (friend) {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(friend.x, friend.y);
      ctx.lineWidth = 0.25;

      ctx.strokeStyle = "white";
      ctx.stroke();
    }
  }
};
Particle.prototype.update = function update() {
  this.x += this.directionX;
  this.y += this.directionY;
  if (this.size + this.x >= width || this.x - this.size <= 1) {
    this.directionX *= -1;
  }
  if (this.size + this.y >= height || this.y - this.size <= 1) {
    this.directionY *= -1;
  }
  this.draw();
};
Particle.prototype.addFriend = function (particle) {
  this.friends.push(particle);
};
let particles = [];

function init() {
  particles = [];
  for (let index = 0; index < count; index++) {
    const size = 5;
    const u = Math.abs(random.value());
    const v = Math.abs(random.value());

    const x = Math.abs(random.noise1D(u)) * (width - size * 2);
    const y = Math.abs(random.noise1D(v)) * (height - size * 2);
    const directionX = random.gaussian(index, random.value() * index) * 0.01;
    const directionY = random.gaussian(index, random.value() * index) * 0.01;

    const colorIndex = Math.round(Math.random() * 10) % colors.length;
    const color = colors[colorIndex];
    const particle = new Particle(x, y, size, directionX, directionY, color);
    particles.push(particle);
  }

  for (let index = 0; index < count; index++) {
    const friendCount = random.rangeFloor(2, 3);
    for (let i = 0; i < friendCount; i++) {
      const friendId = random.rangeFloor(0, count);
      particles[index].addFriend(particles[friendId]);
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, width, height);
  particles.forEach((p) => p.update());
}
init();
animate();
