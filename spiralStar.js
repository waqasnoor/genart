const { lerp } = require("canvas-sketch-util/math");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const margin = 50;

let width = innerWidth - margin;
let height = innerHeight - margin;

ctx.canvas.width = width;
ctx.canvas.height = height;

window.addEventListener("resize", () => {
  width = innerWidth - margin;
  height = innerHeight - margin;
  ctx.canvas.width = width;
  ctx.canvas.height = height;
});
function Particle(size, step, radius, position) {
  this.size = size;
  this.radius = radius;
  this.step = step;
  this.position = position;
}

Particle.prototype.update = function updateParticle() {
  this.position += this.step;
  this.draw();
};
Particle.prototype.draw = function drawParticle() {
  ctx.beginPath();
  ctx.fillStyle = "#fff";

  const x = Math.cos(this.position) * this.radius + width / 2;
  const y = Math.sin(this.position) * this.radius + height / 2;

  drawStar(x, y, 6, this.size, this.size);
  //   ctx.arc(x, y, this.size, 0, Math.PI * 2, false);
  //   ctx.fill();
};
const particles = [];
function init() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, width, height);
  for (let index = 1; index < 100; index++) {
    const size = index * 0.1;
    const step = Math.random() * 0.002 + 0.002;
    // const radius = lerp(0, width, index  / (200 - 2));
    const radius = Math.random() * width;
    const position = Math.random() * Math.PI * 2;
    const particle = new Particle(size, step, radius, position);
    particle.draw();
    particles.push(particle);
  }
}
function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0,0,0,1)";
  ctx.fillRect(0, 0, width, height);
  particles.forEach((particle) => {
    particle.update();
  });
}
function drawStar(posX, posY, spikes, innerRadius, outerRadius) {
  ctx.beginPath();
  ctx.strokeStyle = "#fff";

  let x = posX;
  let y = posY;

  let rotation = (Math.PI / 2) * 3;
  const step = Math.PI / spikes;
  ctx.moveTo(x, y - outerRadius);

  for (let i = 0; i < spikes; i++) {
    x = posX + Math.cos(rotation) * outerRadius;
    y = posY + Math.sin(rotation) * outerRadius;
    ctx.lineTo(x, y);
    rotation += step;

    x = posX + Math.cos(rotation) * innerRadius;
    y = posY + Math.sin(rotation) * innerRadius;
    ctx.lineTo(x, y);
    rotation += step;
  }

  ctx.lineTo(posX, posY - outerRadius);
  ctx.closePath();
  ctx.stroke();
}

init();
animate();
