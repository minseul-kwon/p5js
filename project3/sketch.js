let eyeOffsetX = 0, eyeOffsetY = 0;
let blink = 0;
let mouthMood = 0;
let clickCycle = 0;
let eyebrowOffset = 0;
let eyebrowStyle = 1;
let isCapturing = false;
let captureFrame = 0;

const CAPTURE_SEC = 10;
const CAPTURE_FPS = 12;
const NORMAL_FPS = 30;

function setup() {
  createCanvas(600, 400);
  angleMode(DEGREES);
  frameRate(NORMAL_FPS);
  pixelDensity(1);
}

function draw() {
  const cx = width / 2;
  background(180, 210, 230);

  stroke(60, 40, 30);
  strokeWeight(3);

  if (isCapturing) {
    captureFrame++;

    if (captureFrame % Math.round(CAPTURE_FPS * 0.9) === 0) blink = 10;
    if (captureFrame % Math.round(CAPTURE_FPS * 0.8) === 0) {
      clickCycle = (clickCycle + 1) % 3;
      setMouthByCycle();
    }
    if (captureFrame % CAPTURE_FPS === 0) {
      eyebrowStyle = 1 + Math.floor(Math.random() * 4);
    }
  } else {
    if (frameCount % 240 === 0) blink = 20;
  }

  if (blink > 0) blink -= 1;

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
  const eyeOpen = map(blink, 0, 30, 1, 0, true);
  const eyeSize = 20 * eyeOpen;

  fill(75, 55, 20);
  ellipse(L.x + eyeOffsetX, L.y + eyeOffsetY, eyeSize, eyeSize);
  ellipse(R.x + eyeOffsetX, R.y + eyeOffsetY, eyeSize, eyeSize);

  stroke(75, 55, 20);
  strokeWeight(3);
  line(cx, 200, cx - 5, 210);
  line(cx - 5, 210, cx + 3, 212);

  noFill();
  stroke(180, 84, 43);
  strokeWeight(4);
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

  const baseY = 170 + eyebrowOffset;
  const w = 300, h = 7;

  function brow(x, y, rot, wv = w, hv = h) {
    push();
    translate(x, y);
    rotate(rot);
    arc(0, 0, wv, hv, 200, 350);
    pop();
  }

  if (eyebrowStyle === 1) {
    brow(cx - 40, baseY, 0);
    brow(cx + 40, baseY, 0);
  } else if (eyebrowStyle === 2) {
    brow(cx - 40, baseY, -15);
    brow(cx + 40, baseY, +15);
  } else if (eyebrowStyle === 3) {
    brow(cx - 40, baseY, +15);
    brow(cx + 40, baseY, -15);
  } else if (eyebrowStyle === 4) {
    brow(cx - 40, baseY - 10, 0, 58, 32);
    brow(cx + 40, baseY - 10, 0, 58, 32);
  }
}

function mouseMoved() {
  eyeOffsetX = map(mouseX, 0, width, -5, 5);
  eyeOffsetY = map(mouseY, 0, height, -3, 3);
}

function mousePressed() {
  clickCycle = (clickCycle + 1) % 3;
  setMouthByCycle();
}

function setMouthByCycle() {
  if (clickCycle === 0) mouthMood = 40;
  if (clickCycle === 1) mouthMood = -20;
  if (clickCycle === 2) mouthMood = 0;
}

function keyPressed() {
  if ((key === 'S' || key === 's') && !isCapturing) {
    isCapturing = true;
    captureFrame = 0;
    pixelDensity(1);
    frameRate(CAPTURE_FPS);

    saveGif('character_demo', CAPTURE_SEC, {
      units: 'seconds',
      frameRate: CAPTURE_FPS,
      repeat: 0,
      quality: 14,
      dither: 'FloydSteinberg'
    });

    setTimeout(() => {
      frameRate(NORMAL_FPS);
      isCapturing = false;
    }, (CAPTURE_SEC * 1000) + 500);
  } else if (key === '1') eyebrowStyle = 1;
  else if (key === '2') eyebrowStyle = 2;
  else if (key === '3') eyebrowStyle = 3;
  else if (key === '4') eyebrowStyle = 4;
  else if (keyCode === UP_ARROW) eyebrowOffset = max(eyebrowOffset - 3, -12);
  else if (keyCode === DOWN_ARROW) eyebrowOffset = min(eyebrowOffset + 3, 12);
}
