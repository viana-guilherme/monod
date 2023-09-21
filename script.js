// canvas variables
let scaleFactor = 0.8;

// gameplay variables
let pos, spd;
let food;

// intial setup
function setup() {
  pos = [(windowWidth * scaleFactor) / 2, (windowHeight * scaleFactor) / 2];
  spd = 3;

  var canvas = createCanvas(
    windowWidth * scaleFactor,
    windowHeight * scaleFactor
  );
  canvas.parent(Container);
  canvas.style("display", "block");

  food = new Food();
}

// draw loop
function draw() {
  background("#18181b");
  userMovement(pos);
  circle(pos[0], pos[1], 12);

  // the food
  food.move();
  food.eaten();
  food.display();
}

// GAMEPLAY FUNCTIONS //

// defining main user movement logic
function userMovement(pos) {
  // moves the cell according to arrow presses
  if (keyIsPressed) {
    if (keyIsDown(LEFT_ARROW)) {
      pos[0] -= spd;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      pos[0] += spd;
    }
    if (keyIsDown(UP_ARROW)) {
      pos[1] -= spd;
    }
    if (keyIsDown(DOWN_ARROW)) {
      pos[1] += spd;
    }

    // detects collisions to the edges of the canvas
    pos[0] = constrain(pos[0], 0, windowWidth * scaleFactor);
    pos[1] = constrain(pos[1], 0, windowHeight * scaleFactor);
  }

  // detects if the player is not visible and resets its position to the origin

  if (pos[0] < 0 || pos[0] > windowWidth * scaleFactor) {
    pos[0] = (windowWidth * scaleFactor) / 2;
  }
  if (pos[1] < 0 || pos[1] > windowHeight * scaleFactor) {
    pos[1] = (windowHeight * scaleFactor) / 2;
  }
}

// UI & UX FUNCTIONS //

// readjusts the canvas size if the screen has changed
function windowResized() {
  resizeCanvas(windowWidth * scaleFactor, windowHeight * scaleFactor);
}

// TODO:  should the player have to press a button to eat? this can be the proxy for fitness
// food starts with one color and then changes to green / alpha before disappearing
