let startContext, samples, sampler, button1, button2, button3, button4, button5, button6, delTimeSlider, feedbackSlider, distSlider, wetSlider;

let rev = new Tone.Reverb(5).toDestination()
let dist = new Tone.Distortion(0).connect(rev);
let del = new Tone.FeedbackDelay(0, 0).connect(dist);
del.wet.value = 0.5;

function preload() {
  samples = new Tone.Players({
    cat: "media/cat.mp3",
    seagull: "media/seagulls.mp3",
    dog: "media/dog.mp3",
    horse: "media/horse.mp3",
    sheep: "media/sheep.mp3",
    chicken: "media/chicken.mp3",
  }).connect(del)
}

function setup() {
  createCanvas(400, 400);
  startContext = createButton("Start Audio Context");
  startContext.position(0,0);
  startContext.mousePressed(startAudioContext)
  button1 = createButton("Play Cat Sample");
  button1.position(10, 30);
  button1.mousePressed(() => {samples.player("cat").start()})
  button2 = createButton("Play Seagull Sample");
  button2.position(200, 30);
  button2.mousePressed(() => {samples.player("seagull").start()})
  button3 = createButton("Play Dog Sample");
  button3.position(10, 105);
  button3.mousePressed(() => {samples.player("dog").start()})
  button4 = createButton("Play Horse Sample");
  button4.position(200, 105);
  button4.mousePressed(() => {samples.player("horse").start()})
  button5 = createButton("Play Sheep Sample");
  button5.position(10, 180);
  button5.mousePressed(() => {samples.player("sheep").start()})
  button6 = createButton("Play Chicken Sample");
  button6.position(200, 180);
  button6.mousePressed(() => {samples.player("chicken").start()})
  delTimeSlider = createSlider(0, 1, 0, 0.01);
  delTimeSlider.position(10, 250);
  delTimeSlider.input(() => {del.delayTime.value = delTimeSlider.value()});
  feedbackSlider = createSlider(0, 0.99, 0, 0.01);
  feedbackSlider.position(200, 250);
  feedbackSlider.input(() => {del.feedback.value = feedbackSlider.value()});
  distSlider = createSlider(0, 10, 0, 0.01);
  distSlider.position(10, 350);
  distSlider.input(() => {dist.distortion = distSlider.value()});
  wetSlider = createSlider(0, 1, 0, 0.01);
  wetSlider.position(200, 350);
  wetSlider.input(() => {rev.wet.value = wetSlider.value()});
}

function draw() {
  background(220);
  text("Delay Time: " + delTimeSlider.value(), 15, 290);
  text("Feedback Amount: " + feedbackSlider.value(), 205, 290);
  text("Distortion Amount: " + distSlider.value(), 15, 390);
  text("Reverb Wet Amount: " + wetSlider.value(), 205, 390)
}

function startAudioContext() {
  if (Tone.context.state != 'running') {
    Tone.start();
    console.log("Audio Context Started")
  } else {
    console.log("Audio Context is already running")
  }
}