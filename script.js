let x, y, width, height, ctr, spd, pos;

function setup() {
  width = windowWidth * 0.8;
  height = windowHeight * 0.8;
  x = width / 2;
  y = height / 2;
  spd = 3;
  pos = [x, y];

  var canvas = createCanvas(width, height);
  canvas.parent(Container);
  canvas.style("display", "block");
}

function draw() {
  //function userMvmt(x, y) {
  // detects user input
  if (keyIsPressed) {
    if (keyIsDown(UP_ARROW)) {
      y -= spd;
    }
    if (keyIsDown(DOWN_ARROW)) {
      y += spd;
    }
    if (keyIsDown(LEFT_ARROW)) {
      x -= spd;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      x += spd;
    }

    // detects collisions to the edges
    x = constrain(x, 0, width);
    y = constrain(y, 0, height);
    pos = [x, y];
  }
  //}

  background("#18181b");

  //pos = userMvmt(x, y);

  circle(pos[0], pos[1], 12);
}

class Cell {
  constructor(name, status, viability, fitnessScore, mutationRate) {
    this.name = name;
    this.status = status; // bool: cells is alive or dead
    this.viability = viability;
    this.fitnessScore = fitnessScore;
    this.mutationRate = mutationRate;
  }

  isHit(factor) {
    console.log(`${this.name} was hit!`);
    this.viability -= factor;
  }
}
