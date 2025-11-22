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

  // 🔥 자동 애니메이션 (눈 깜빡임 + 표정 변화 + 눈썹 스타일)
  if (!isCapturing) {
    if (frameCount % 60 === 0) blink = 20; // 2초마다 눈 깜빡임
    if (frameCount % 120 === 0) setMouthByCycle(); // 4초마다 표정 변경
    if (frameCount % 180 === 0) eyebrowStyle = 1 + Math.floor(Math.random() * 4); // 6초마다 랜덤 눈썹
  }

  if (blink > 0) blink -= 1;

  // ---- 캐릭터 그리기 (기존 코드 유지) ----
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
  vertex(cx - 70, 330);vertex(cx + 70, 330);
  vertex(cx + 60, 400);vertex(cx - 60, 400);
  endShape(CLOSE);

  fill(250);
  beginShape();
  vertex(180, 330);vertex(width - 180, 330);
  vertex(width, 430);vertex(0, 430);
  endShape(CLOSE);

  fill(249, 219, 172);
  beginShape();
  vertex(cx - 68, 331);vertex(cx, 374);vertex(cx + 68, 331);
  endShape(CLOSE);

  const nx = cx;
  const ny = 332;
  const w = 120, h = 54;

  stroke(0);
  strokeWeight(2);
  noFill();
  arc(nx, ny, w, h, 0, 180);

  const hookX = nx, hookY = ny + h / 2;
  stroke(0);strokeWeight(2);noFill();
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

// ----- 기존 함수 그대로 유지 -----
function drawAsteriskPendant(x,y,size){ ... }
function drawEyebrows(cx){ ... }
function mouseMoved(){ ... }
function mousePressed(){ ... }
function keyPressed(){ ... }
function setMouthByCycle(){ ... }
