function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("game-canvas");
  background(125, 220, 180);
}

function draw() {
  // Your drawing and animation code goes here
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
