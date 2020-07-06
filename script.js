const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width = innerWidth;
ctx.canvas.height = innerHeight;

const colors = ["#8837CC", "#FFE49E", "#CC9337"];

window.addEventListener("resize", () => {
  ctx.canvas.width = innerWidth;
  ctx.canvas.height = innerHeight;
});

function Particle(x, y, size, directionX, directionY, color) {
  this.x = x;
  this.y = y;
  this.directionX = directionX;
  this.directionY = directionY;
  this.size = size;
  this.color = color;
}

Particle.prototype.draw = function update() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
  ctx.fillStyle = this.color;
  ctx.fill();
};
Particle.prototype.update = function update() {
  this.x += this.directionX;
  this.y += this.directionY;
  if (this.size + this.x >= innerWidth || this.x - this.size <= 1) {
    this.directionX *= -1;
  }
  if (this.size + this.y >= innerHeight || this.y - this.size <= 1) {
    this.directionY *= -1;
  }
  this.draw();
};
let particles = [];

function init() {
  for (let index = 0; index < 100; index++) {
    const size = Math.random() * 20;
    const x = Math.random() * (innerWidth - size * 2);
    const y = Math.random() * (innerHeight - size * 2);
    const directionX = Math.random() * 0.4 - 0.2;
    const directionY = Math.random() * 0.4 - 0.2;
    const colorIndex = Math.round(Math.random() * 10) % colors.length;
    const color = colors[colorIndex];
    const particle = new Particle(x, y, size, directionX, directionY, color);
    particles.push(particle);
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  particles.forEach((p) => p.update());
}
init();
animate();
