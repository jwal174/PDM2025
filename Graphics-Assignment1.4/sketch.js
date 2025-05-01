let bugs = [];
let bugCount = 40;
let squishCount = 0;
let timer = 30;
let gameOver = false;
let walkSprite;
let squishImg;
let frameCountForTimer = 0;

function preload() {
  walkSprite = loadImage('media/bug_walk.png');
  squishImg = loadImage('media/bug_squished.png');
}

function setup() {
  createCanvas(800, 600);
  imageMode(CENTER);
  for (let i = 0; i < bugCount; i++) {
    bugs.push(new Bug());
  }
}

function draw() {
  background(220);

  if (!gameOver) {
    frameCountForTimer++;
    if (frameCountForTimer % 60 === 0) {
      timer--;
      if (timer <= 0) {
        gameOver = true;
      }
    }

    for (let bug of bugs) {
      bug.update();
      bug.display();
    }

    fill(0);
    textSize(24);
    text(`Squished: ${squishCount}`, 20, 30);
    text(`Time: ${timer}`, 20, 60);
  } else {
    fill(0);
    textSize(36);
    textAlign(CENTER, CENTER);
    text(`Game Over! Bugs squished: ${squishCount}`, width / 2, height / 2);
  }
}

function mousePressed() {
  if (gameOver) return;

  for (let bug of bugs) {
    if (!bug.squished && bug.isClicked(mouseX, mouseY)) {
      bug.squish();
      squishCount++;

      for (let b of bugs) {
        if (!b.squished) {
          b.speed *= 1.05;
        }
      }
      break;
    }
  }
}

class Bug {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.dir = p5.Vector.random2D();
    this.speed = random(1, 2);
    this.frame = 0;
    this.frameTimer = 0;
    this.squished = false;
    this.size = 50;
  }

  update() {
    if (this.squished) return;

    this.x += this.dir.x * this.speed;
    this.y += this.dir.y * this.speed;

    if (this.x < 0 || this.x > width) this.dir.x *= -1;
    if (this.y < 0 || this.y > height) this.dir.y *= -1;

    this.frameTimer++;
    if (this.frameTimer % 6 === 0) {
      this.frame = (this.frame + 1) % 7;
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    if (!this.squished) {
      rotate(this.dir.heading() + HALF_PI);

      let frameHeight = walkSprite.height / 7;
      image(
        walkSprite,
        0, 0,
        this.size, this.size,
        0, this.frame * frameHeight,
        walkSprite.width, frameHeight
      );
    } else {
      image(squishImg, 0, 0, this.size, this.size);
    }
    pop();
  }

  isClicked(mx, my) {
    return dist(mx, my, this.x, this.y) < this.size / 2;
  }

  squish() {
    this.squished = true;
  }
}
