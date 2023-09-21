class Cell {
  constructor(
    name = "player",
    status = "alive",
    viability = 100,
    mutationRate = 1,
    totalMutations = 0,
    fitnessScore = 1,
    position = [
      (windowWidth * scaleFactor) / 2,
      (windowHeight * scaleFactor) / 2,
    ],
    speed = 3
  ) {
    this.name = name;
    this.status = status; // bool: cells are alive or dead
    this.viability = viability;
    this.fitnessScore = fitnessScore;
    this.mutationRate = mutationRate;
    this.totalMutations = totalMutations;
    this.position = position;
    this.speed = speed;
  }

  // defining main user movement logic
  move() {
    // moves the cell according to arrow presses
    if (keyIsPressed) {
      if (keyIsDown(LEFT_ARROW)) {
        this.position[0] -= this.speed;
      }
      if (keyIsDown(RIGHT_ARROW)) {
        this.position[0] += this.speed;
      }
      if (keyIsDown(UP_ARROW)) {
        this.position[1] -= this.speed;
      }
      if (keyIsDown(DOWN_ARROW)) {
        this.position[1] += this.speed;
      }
      // detects collisions to the edges of the canvas
      this.position[0] = constrain(
        this.position[0],
        0,
        windowWidth * scaleFactor
      );
      this.position[1] = constrain(
        this.position[1],
        0,
        windowHeight * scaleFactor
      );
    }
    // detects if the player is not visible and resets its position to the origin
    if (this.position[0] < 0 || this.position[0] > windowWidth * scaleFactor) {
      this.position[0] = (windowWidth * scaleFactor) / 2;
    }
    if (this.position[1] < 0 || this.position[1] > windowHeight * scaleFactor) {
      this.position[1] = (windowHeight * scaleFactor) / 2;
    }
  }

  display() {
    circle(this.position[0], this.position[1], 12);
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
