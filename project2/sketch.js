function setup() {
  createCanvas(600, 400);
  angleMode(DEGREES);
  pixelDensity(1);
}

function draw() {
  const cx = width / 2;
  background(180, 210, 230);

  stroke(60, 40, 30);
  strokeWeight(3);

  fill(75, 55, 20);
  ellipse(cx, 180, 210, 220);
  ellipse(cx + 80, 270, 80, 70);

  fill(249, 219, 172);
  ellipse(cx - 90, 190, 40, 48);
  ellipse(cx + 90, 190, 40, 48);

  fill(249, 219, 172);
  ellipse(cx, 190, 180, 200);

  fill(75, 55, 20);
  noStroke();
  push();
  translate(cx, 160);
  rotate(25);
  arc(0, 0, 200, 220, 200, 340, CHORD);
  rotate(-50);
  arc(0, 0, 200, 200, 200, 340, CHORD);
  pop();

  noStroke();
  fill(249, 219, 172);
  rect(cx - 20, 270, 40, 60, 10);

  noStroke();
  fill(249, 219, 172);
  beginShape();
  vertex(cx - 70, 330);
  vertex(cx + 70, 330);
  vertex(cx + 60, 400);
  vertex(cx - 60, 400);
  endShape(CLOSE);

  fill(250);
  beginShape();
  vertex(180, 330);
  vertex(width - 180, 330);
  vertex(width, 430);
  vertex(0, 430);
  endShape(CLOSE);

  fill(249, 219, 172);
  beginShape();
  vertex(cx - 68, 331);
  vertex(cx, 374);
  vertex(cx + 68, 331);
  endShape(CLOSE);

  const nx = cx;
  const ny = 332;
  const w = 120, h = 54;

  stroke(0);
  strokeWeight(2);
  noFill();
  arc(nx, ny, w, h, 0, 180);

  const hookX = nx;
  const hookY = ny + h / 2;
  stroke(0);
  strokeWeight(2);
  noFill();
  circle(hookX, hookY, 6);
  line(hookX, hookY + 3, hookX, hookY + 14);
  drawAsteriskPendant(hookX, hookY + 22, 9);

  drawEyebrows(cx);

  noStroke();
  const L = { x: cx - 40, y: 190 };
  const R = { x: cx + 40, y: 190 };
  const eyeSize = 20;

  fill(75, 55, 20);
  ellipse(L.x, L.y, eyeSize, eyeSize);
  ellipse(R.x, R.y, eyeSize, eyeSize);

  stroke(75, 55, 20);
  strokeWeight(3);
  line(cx, 200, cx - 5, 210);
  line(cx - 5, 210, cx + 3, 212);

  noFill();
  stroke(180, 84, 43);
  strokeWeight(4);
  const mouthMood = 40;
  arc(cx, 230, 50, 25 + mouthMood, 15, 165);
}

function drawAsteriskPendant(x, y, size) {
  push();
  translate(x, y);
  stroke(0);
  strokeWeight(2.2);
  for (let k = 0; k < 3; k++) {
    const ang = radians(60 * k);
    const dx = cos(ang) * size;
    const dy = sin(ang) * size;
    line(-dx, -dy, dx, dy);
  }
  pop();
}

function drawEyebrows(cx) {
  stroke(75, 55, 20);
  strokeWeight(5);
  noFill();

  const baseY = 170;
  const w = 300, h = 7;

  function brow(x, y, rot, wv = w, hv = h) {
    push();
    translate(x, y);
    rotate(rot);
    arc(0, 0, wv, hv, 200, 350);
    pop();
  }

  brow(cx - 40, baseY, 0);
  brow(cx + 40, baseY, 0);
}
