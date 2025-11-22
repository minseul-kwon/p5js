function setup() {
  createCanvas(600, 400);
  noLoop();
}

function draw() {
  background(220);

  fill(200, 230, 255);
  stroke(0);
  strokeWeight(2);
  quad(50, 50, 250, 50, 230, 200, 70, 180);

  fill(255, 150, 150);
  stroke(50);
  strokeWeight(3);
  ellipse(300, 150, 120, 120);

  fill(150, 250, 150);
  stroke(0);
  strokeWeight(2);
  triangle(400, 50, 550, 100, 450, 180);

  fill(255, 220, 100);
  stroke(0);
  strokeWeight(2);
  arc(200, 300, 100, 100, 0, PI + QUARTER_PI);

  fill(100, 200, 255);
  stroke(0);
  strokeWeight(1);
  ellipse(100, 300, 40, 40);
  ellipse(180, 320, 40, 40);
  ellipse(260, 340, 40, 40);
  ellipse(340, 360, 40, 40);
  ellipse(420, 380, 40, 40);

  stroke(0);
  strokeWeight(4);
  line(50, 350, 550, 350);

  noStroke();
  fill(150, 180, 250, 180);
  rect(400, 250, 120, 80);
}
