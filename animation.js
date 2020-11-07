const canvas = document.querySelector("canvas");

const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let backgroundColor = "rgba(255, 255, 255, 0.05)";

let mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});

window.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

window.addEventListener("click", () => {
  if (backgroundColor === "rgba(0, 0, 0, 0.05)") {
    backgroundColor = "rgba(255, 255, 255, 0.05)";
  } else {
    backgroundColor = "rgba(0, 0, 0, 0.05)";
  }
});

window.addEventListener("mouseleave", () => {
  mouse.x = window.innerWidth / 2;
  mouse.y = window.innerHeight / 2;
});

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomColor = (colors) => {
  return colors[Math.floor(Math.random() * colors.length)];
};

class Particle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radian = Math.random() * Math.PI * 2;
    this.velocity = 0.05;
    this.distance = getRandomNumber(50, 120);
    this.lastMouse = {
      x: x,
      y: y,
    };

    this.draw = (lastPoints) => {
      c.beginPath();
      c.strokeStyle = this.color;
      c.lineWidth = this.radius;
      c.moveTo(lastPoints.x, lastPoints.y);
      c.lineTo(this.x, this.y);
      c.stroke();
      c.closePath();
    };

    this.update = () => {
      const lastPoints = {
        x: this.x,
        y: this.y,
      };

      this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
      this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

      this.radian += this.velocity;
      this.x = this.lastMouse.x + Math.cos(this.radian) * this.distance;
      this.y = this.lastMouse.y + Math.sin(this.radian) * this.distance;
      this.draw(lastPoints);
    };
  }
}

let particles = [];
let colors = [
  "#57FF3D",
  "#40FC23",
  "#B01607",
  "#3D93FC",
  "#FC0AB2",
  "#D7FE17",
  "#4B3DFC",
];

const init = () => {
  particles = [];
  for (let i = 0; i < 50; i++) {
    const radius = Math.random() * 5 + 1;
    particles.push(
      new Particle(
        innerWidth / 2,
        innerHeight / 2,
        radius,
        getRandomColor(colors)
      )
    );
  }
};

const animation = () => {
  requestAnimationFrame(animation);
  c.fillStyle = backgroundColor;
  c.fillRect(0, 0, innerWidth, innerHeight);

  particles.forEach((particle) => {
    particle.update();
  });
};

init();
animation();
