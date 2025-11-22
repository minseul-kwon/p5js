function setup() {
  createCanvas(200, 133);
  frameRate(10);
}

function draw() {
  let t = frameCount * 0.02;
  let timeSec = millis() / 1000.0;

  background(230);

  push();
  scale(200 / 600, 133 / 400);

  let quadYOffset = sin(t) * 10;
  fill(200, 230, 255);
  stroke(0);
  strokeWeight(2);
  quad(
    50, 50 + quadYOffset,
    250, 50 + quadYOffset,
    230, 200 + quadYOffset,
    70, 180 + quadYOffset
  );

  let baseDiam = 120;
  let pulse = 20 * sin(t * 1.5);
  let circleDiam = baseDiam + pulse;

  let c1 = color(255, 150, 150);
  let c2 = color(255, 200, 255);
  let amt = (sin(t) + 1) / 2;
  let circleColor = lerpColor(c1, c2, amt);

  fill(circleColor);
  stroke(50);
  strokeWeight(3);
  ellipse(300, 150, circleDiam, circleDiam);

  let triOffsetX = cos(t * 0.8) * 10;
  let triOffsetY = sin(t * 0.8) * 5;
  let triAngle = sin(t) * 0.2;

  push();
  translate(475 + triOffsetX, 110 + triOffsetY);
  rotate(triAngle);
  fill(150, 250, 150);
  stroke(0);
  strokeWeight(2);
  triangle(-75, -60, 75, -10, -25, 70);
  pop();

  let arcSize = 100 + 20 * sin(t * 0.7);
  let arcOffset = sin(t * 0.5) * QUARTER_PI * 0.5;

  fill(255, 220, 100);
  stroke(0);
  strokeWeight(2);
  arc(
    200,
    300,
    arcSize,
    arcSize,
    0 + arcOffset,
    PI + QUARTER_PI + arcOffset
  );

  fill(100, 200, 255);
  stroke(0);
  strokeWeight(1);

  let xs = [100, 180, 260, 340, 420];
  for (let i = 0; i < xs.length; i++) {
    let phase = i * 0.6;
    let yWave = 20 * sin(t + phase);
    ellipse(xs[i], 320 + yWave, 40, 40);
  }

  stroke(0);
  strokeWeight(4);
  let lineYOffset = sin(timeSec * 1.2) * 3;
  line(50, 350 + lineYOffset, 550, 350 + lineYOffset);

  let r1 = color(150, 180, 250, 120);
  let r2 = color(200, 120, 255, 220);
  let rectColor = lerpColor(r1, r2, (sin(t * 0.9) + 1) / 2);
  let flickerAlpha = random(150, 190);
  rectColor.setAlpha(flickerAlpha);

  noStroke();
  fill(rectColor);
  rect(400, 250, 120, 80);

  pop();
}

function mousePressed() {
  // saveGif 사용 부분 (실제 GIF 저장은 별도 라이브러리 필요)
  saveGif('myArtwork', 10);
}
