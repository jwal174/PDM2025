let synth, polySynth, ampEnv;

let dist = new Tone.Distortion(0).toDestination();

let activeKey = null;

let keyNotes = {
  'a': 'C4',
  's': 'D4',
  'd': 'E4',
  'f': 'F4',
  'j': 'G4',
  'k': 'A4',
  'l': 'B4',
  ';': 'C5'
}

function setup() {
  createCanvas(400, 400);
  synth = new Tone.Synth({
    envelope: {
      attack: 0.1,
      decay: 0.2,
      sustain: 0.9,
      release: 0.3
    }
  }).connect(dist)
  synth.portamento.value = 0.5;
  polySynth = new Tone.PolySynth(Tone.Synth).connect(dist);
  polySynth.set({
    envelope: {
      attack: 0.1,
      decay: 0.1,
      sustain: 1,
      release: 0.5
    },
  })
  polySynth.volume.value = -6;
  ampEnv = new Tone.AmplitudeEnvelope({
    attack: 0.1,
    decay: 0.5,
    sustain: 0,
    release: 0.1
  }).toDestination()
  distSlider = createSlider(0, 10, 0, 0.01);
  distSlider.position(125, 315);
  distSlider.input(() => {dist.distortion = distSlider.value()});
}

function draw() {
  background(220);
  text("This synthesizer plays the C4-C5 octave using eight keys!", 40, 100);
  text(" The keys and their corresponding note are listed below.", 40, 112);
  text("a", 10, 200);
  text("s", 62, 200);
  text("d", 114, 200);
  text("f", 166, 200);
  text("j", 218, 200);
  text("k", 270, 200);
  text("l", 322, 200);
  text(";", 375, 200);
  text("|", 10, 215);
  text("|", 62, 215);
  text("|", 114, 215);
  text("|", 166, 215);
  text("|", 218, 215);
  text("|", 270, 215);
  text("|", 322, 215);
  text("|", 375, 215);
  text("|", 10, 225);
  text("|", 62, 225);
  text("|", 114, 225);
  text("|", 166, 225);
  text("|", 218, 225);
  text("|", 270, 225);
  text("|", 322, 225);
  text("|", 375, 225);
  text("C4", 10, 250);
  text("D4", 62, 250);
  text("E4", 114, 250);
  text("F4", 166, 250);
  text("G4", 218, 250);
  text("A4", 270, 250);
  text("B4", 322, 250);
  text("C5", 375, 250);
  text("Distortion Amount: " + distSlider.value(), 140, 350);
}

function keyPressed() {
  let pitch = keyNotes[key];
  if (pitch) {
    polySynth.triggerAttack(pitch);
  } 
}

function keyReleased() {
  let pitch = keyNotes[key];
  if (key === activeKey) {
    synth.triggerRelease();
    activeKey = null;
  } else if (pitch) {
    polySynth.triggerRelease(pitch);
  }
}