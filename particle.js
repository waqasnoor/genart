const random = require("canvas-sketch-util/random");
const palletes = require("nice-color-palettes");
const { range } = require("canvas-sketch-util/random");
const pallete = random.pick(palletes);

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width = innerWidth;
ctx.canvas.height = innerHeight;

const colors = pallete;

const mouse = { x: null, y: null, radius: 80 };
window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});
window.addEventListener("mouseout", (event) => {
  mouse.x = null;
  mouse.y = null;
});

let width = innerWidth;
let height = innerHeight;
let count = 200;
window.addEventListener("resize", () => {
  let width = innerWidth - 50;
  let height = innerHeight - 50;
  ctx.canvas.width = width;
  ctx.canvas.height = height;
  // count = (width / height) * 100;

  init();
});

function Particle(x, y, size, directionX, directionY, color) {
  this.x = x;
  this.y = y;
  this.directionX = directionX;
  this.directionY = directionY;
  this.size = size;
  this.color = "#000";
}

Particle.prototype.draw = function draw() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
  ctx.fillStyle = this.color;
  ctx.fill();
};
Particle.prototype.update = function update() {
  this.x += this.directionX;
  this.y += this.directionY;

  const xDiff = this.x - mouse.x;

  const yDiff = this.y - mouse.y;
  const distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

  if (distance < mouse.radius) {
    if (xDiff <= mouse.radius && xDiff >= 0) {
      this.x += 1;
      this.directionX *= -1;
    }
    if (xDiff <= 0 && xDiff >= -mouse.radius) {
      this.x -= 1;
      this.directionX *= -1;
    }

    if (yDiff <= mouse.radius && yDiff >= 0) {
      this.y += 1;
      this.directionY *= -1;
    }
    if (yDiff <= 0 && yDiff >= -mouse.radius) {
      this.y -= 1;
      this.directionY *= -1;
    }
  }

  if (this.size + this.x >= width || this.x - this.size <= 1) {
    this.directionX *= -1;
  }
  if (this.size + this.y >= height || this.y - this.size <= 1) {
    this.directionY *= -1;
  }

  const centerX = ctx.canvas.width / 2;

  const isOnRight = this.x - centerX <= 0;
  if (isOnRight) {
    this.color = "#fff";
  } else {
    this.color = "#000";
  }

  this.draw();
};

let particles = [];

function connect() {
  const opacity = 1;

  for (let i = 0; i < particles.length; i++) {
    const particle1 = particles[i];
    for (let j = i; j < particles.length; j++) {
      const particle2 = particles[j];
      const distance = Math.sqrt(
        Math.pow(particle1.x - particle2.x, 2) +
          Math.pow(particle1.y - particle2.y, 2)
      );
      if (Math.abs(distance) <= mouse.radius) {
        ctx.beginPath();
        const opacityValue = distance / mouse.radius;

        ctx.moveTo(particle1.x, particle1.y);
        ctx.lineTo(particle2.x, particle2.y);
        ctx.lineWidth = 1;
        // if (particle1.color === particle2.color) {
        //   ctx.strokeStyle = particle1.color;
        // }

        ctx.strokeStyle = particle1.color;

        ctx.stroke();
      }
    }
  }
}

function init() {
  particles = [];
  for (let index = 0; index < count; index++) {
    const size = 1 + Math.random() * 3;

    const x = random.value() * (width - size * 2);

    const y = random.value() * (height - size * 2);
    const directionX = random.value() * 5;

    const directionY = random.value() * 5;

    const colorIndex = Math.round(Math.random() * 10) % colors.length;

    const color = "#000";
    const particle = new Particle(x, y, size, directionX, directionY, color);
    particles.push(particle);
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, width / 2, height);
  particles.forEach((p) => p.update());
  connect();
}
init();
animate();
