let colors = [];
let currentColor;
let paletteWidth = 50;
let prevX, prevY;

function setup() {
  createCanvas(800, 600);
  background(255);
  setupPalette();
  currentColor = color(0); // default to black
}

function draw() {
  drawPalette();

  if (mouseIsPressed && mouseX > paletteWidth) {
    stroke(currentColor);
    strokeWeight(4);
    line(prevX, prevY, mouseX, mouseY);
  }

  prevX = mouseX;
  prevY = mouseY;
}

function mousePressed() {
  // Only check for palette clicks on press, not hold
  if (mouseX < paletteWidth) {
    for (let i = 0; i < colors.length; i++) {
      let y = i * 50;
      if (mouseY > y && mouseY < y + 50) {
        currentColor = colors[i];
        break;
      }
    }
  }
}

function setupPalette() {
  colors = [
    color(255, 0, 0),    // red
    color(255, 165, 0),  // orange
    color(255, 255, 0),  // yellow
    color(0, 255, 0),    // green
    color(0, 255, 255),  // cyan
    color(0, 0, 255),    // blue
    color(255, 0, 255),  // magenta
    color(165, 42, 42),  // brown
    color(255, 255, 255),// white
    color(0, 0, 0)       // black
  ];
}

function drawPalette() {
  noStroke();
  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    rect(0, i * 50, paletteWidth, 50);
  }
}
