/*let spelunkySheet, greenSheet, purpleSheet;
let characters = [];
let spriteSize = 80;
let numFrames = 4; // adjust if needed
let moveDirection = 0;

function preload() {
  spelunkySheet = loadImage('media/spelunky.png');
  greenSheet = loadImage('media/green.png');
  purpleSheet = loadImage('media/purple.png');
}

function setup() {
  createCanvas(800, 400);
  for (let i = 0; i < 3; i++) {
    characters.push(new Character(random(width), height - spriteSize, spelunkySheet));
    characters.push(new Character(random(width), height - spriteSize, greenSheet));
    characters.push(new Character(random(width), height - spriteSize, purpleSheet));
  }
}

function draw() {
  background(220);
  for (let c of characters) {
    c.update();
    c.draw();
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) moveDirection = 1;
  else if (keyCode === LEFT_ARROW) moveDirection = -1;
}

function keyReleased() {
  if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) moveDirection = 0;
}

class Character {
  constructor(x, y, spriteSheet) {
    this.x = x;
    this.y = y;
    this.sheet = spriteSheet;
    this.frame = 0;
    this.frameCount = 4;
    this.frameTimer = 0;
    this.frameSpeed = 8;
    this.facing = 1; // 1: right, -1: left
    this.speed = 2;
  }

  update() {
    if (moveDirection !== 0) {
      this.x += this.speed * moveDirection;
      this.facing = moveDirection;
      this.frameTimer++;
      if (this.frameTimer >= this.frameSpeed) {
        this.frame = (this.frame + 1) % this.frameCount;
        this.frameTimer = 0;
      }
    } else {
      this.frame = 0;
    }
  }

  draw() {
    push();
    translate(this.x + (this.facing === -1 ? spriteSize : 0), this.y);
    scale(this.facing, 1);
    image(
      this.sheet,
      0, 0,
      spriteSize, spriteSize,
      this.frame * spriteSize, 0,
      spriteSize, spriteSize
    );
    pop();
  }
}
*/


let spelunkySheet, greenSheet, purpleSheet;
let characters = [];
let spriteSize = 80;
let numFrames = 4;
let moveX = 0;
let moveY = 0;

function preload() {
  spelunkySheet = loadImage('media/spelunky.png');
  greenSheet = loadImage('media/green.png');
  purpleSheet = loadImage('media/purple.png');
}

function setup() {
  createCanvas(800, 600);
  for (let i = 0; i < 3; i++) {
    characters.push(new Character(random(width), random(height), spelunkySheet));
    characters.push(new Character(random(width), random(height), greenSheet));
    characters.push(new Character(random(width), random(height), purpleSheet));
  }
}

function draw() {
  background(220);
  for (let c of characters) {
    c.update();
    c.draw();
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) moveX = 1;
  else if (keyCode === LEFT_ARROW) moveX = -1;
  else if (keyCode === UP_ARROW) moveY = -1;
  else if (keyCode === DOWN_ARROW) moveY = 1;
}

function keyReleased() {
  if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) moveX = 0;
  if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) moveY = 0;
}

class Character {
  constructor(x, y, spriteSheet) {
    this.x = x;
    this.y = y;
    this.sheet = spriteSheet;
    this.frame = 0;
    this.frameTimer = 0;
    this.frameSpeed = 8;
    this.speed = 2;
    this.facing = 1;
  }

  update() {
    if (moveX !== 0 || moveY !== 0) {
      this.x += this.speed * moveX;
      this.y += this.speed * moveY;
      if (moveX !== 0) this.facing = moveX;

      this.frameTimer++;
      if (this.frameTimer >= this.frameSpeed) {
        this.frame = (this.frame + 1) % numFrames;
        this.frameTimer = 0;
      }
    } else {
      this.frame = 0;
    }

    // Stay on screen
    this.x = constrain(this.x, 0, width - spriteSize);
    this.y = constrain(this.y, 0, height - spriteSize);
  }

  draw() {
    push();
    translate(this.x + (this.facing === -1 ? spriteSize : 0), this.y);
    scale(this.facing, 1);
    image(
      this.sheet,
      0, 0,
      spriteSize, spriteSize,
      this.frame * spriteSize, 0,
      spriteSize, spriteSize
    );
    pop();
  }
}
