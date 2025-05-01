function setup() {
  createCanvas(800, 800);
  noLoop();
}

function draw() {
  background(255);
  noStroke();

  push();
  fill(0, 255, 0);
  rect(0, 0, width / 2, height / 2);

  stroke(0);
  strokeWeight(2);
  fill(255);
  rect(200, 100, 100, 100);
  ellipse(125, 150, 100);
  pop();

  push();
  translate(width / 2, 0);
  fill(255);
  rect(0, 0, width / 2, height / 2);
  blendMode(MULTIPLY);
  noStroke();
  fill(255, 0, 0, 200);
  ellipse(200, 100, 150);
  fill(0, 255, 0, 200);
  ellipse(250, 150, 150);
  fill(0, 0, 255, 200);
  ellipse(150, 150, 150);
  blendMode(BLEND);
  pop();

   push();
   translate(0, height / 2);
   fill(0);
   rect(0, 0, width / 2, height / 2);
 
   fill(255, 255, 0);
   arc(150, 200, 100, 100, -PI / 1.25, PI/1.25, PIE);
 
   fill(255, 0, 0);
   rect(250, 150, 60, 80);
   arc(280, 150, 60, 60, PI, 0, CHORD);
   fill(255);
   ellipse(265, 170, 15, 20);
   ellipse(295, 170, 15, 20);
   fill(0);
   ellipse(265, 170, 5, 5);
   ellipse(295, 170, 5, 5);
   pop();

  push();
  translate(width / 2, height / 2);
  fill(0, 0, 255);
  rect(0, 0, width / 2, height / 2);

  push();
  translate(width / 4, height / 4);
  stroke(255);
  strokeWeight(2);
  fill(0, 255, 0);
  ellipse(0, 0, 200);
  pop();

  push();
  translate(width / 4, height / 4);
  stroke(255);
  strokeWeight(2);
  fill(255, 0, 0);
  drawStar(0, 0, 40, 80, 5);
  pop();

  pop();
}

function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
