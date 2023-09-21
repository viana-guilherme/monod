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

class Food {
  constructor() {
    this.x = random(windowWidth * scaleFactor);
    this.y = random(windowHeight * scaleFactor);
    this.diameter = 23;
    this.speedX = random(1, 3);
    this.speedY = random(1, 3);
    this.biasX = random([-1, 1]);
    this.biasY = random([-1, 1]);
    this.amount = 100;
    this.status = "full";
  }

  move() {
    // avoids wall collisions
    if (
      this.x >= windowWidth * scaleFactor - this.diameter ||
      this.x <= this.diameter
    ) {
      this.biasX *= -1;
    }
    this.x += this.biasX * noise(this.x) * this.speedX;

    if (
      this.y >= windowHeight * scaleFactor - this.diameter ||
      this.y <= this.diameter
    ) {
      this.biasY *= -1;
    }
    this.y += this.biasY * noise(this.y) * this.speedY;

    // Prevents that the object goes out of bounds
    this.x = constrain(
      this.x,
      this.diameter,
      windowWidth * scaleFactor - this.diameter
    );
    this.y = constrain(
      this.y,
      this.diameter,
      windowHeight * scaleFactor - this.diameter
    );
  }

  eaten() {
    this.amount -= 0.05;

    if (this.amount <= 0) {
      this.status = "depleted";
    }
  }

  display() {
    circle(this.x, this.y, this.diameter);
  }
}
