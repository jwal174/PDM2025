let colors = [
  'red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'magenta', 'brown', 'white', 'black'
];
let selectedColor = 'black';
let paletteWidth = 50;
let sound = {};
let synth;
let painting = false;
let bgMusic;
let clearButton;

function preload() {
  soundFormats('mp3');
  sound = {
    change: loadSound('media/change.mp3'),
    paint: loadSound('media/paint.mp3'),
    clear: loadSound('media/clear.mp3')
  };
  bgMusic = loadSound('media/background.mp3');
}

function setup() {
  createCanvas(600, 600);
  background(200);
  drawPalette();
  synth = new p5.Oscillator('sine');
  synth.start();
  synth.amp(0);
  
  if (bgMusic.isLoaded()) {
    bgMusic.loop();
    bgMusic.setVolume(0.5);
  }
  
  clearButton = createButton('Clear Canvas');
  clearButton.position(width - 100, height - 25);
  clearButton.mousePressed(clearCanvas);
}

function drawPalette() {
  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    stroke(0);
    rect(0, i * 40, paletteWidth, 40);
  }
}

function mousePressed() {
  if (mouseX < paletteWidth) {
    let index = floor(mouseY / 40);
    if (index >= 0 && index < colors.length) {
      selectedColor = colors[index];
      if (sound.change.isLoaded()) sound.change.play();
    }
  } else {
    painting = true;
    if (sound.paint.isLoaded() && !sound.paint.isPlaying()) sound.paint.play();
  }
}

function mouseReleased() {
  painting = false;
  sound.paint.stop();
  synth.amp(0, 0.1);
}

function draw() {
  if (painting && mouseX > paletteWidth) {
    stroke(selectedColor);
    strokeWeight(4);
    line(pmouseX, pmouseY, mouseX, mouseY);
    synth.freq(map(mouseX, paletteWidth, width, 200, 800));
    synth.amp(0.3, 0.1);
  }
  drawPalette();
}

function clearCanvas() {
  background(200);
  drawPalette();
  if (sound.clear.isLoaded()) sound.clear.play();
}
