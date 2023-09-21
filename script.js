// canvas variables
let scaleFactor = 0.8;

// gameplay variables
let player;
let food = [];
let nFood = 56;

// intial setup
function setup() {
  // draw the player
  player = new Cell();

  // populate the game with food objects
  for (let i = 0; i < nFood; i++) {
    food.push(new Food());
  }

  var canvas = createCanvas(
    windowWidth * scaleFactor,
    windowHeight * scaleFactor
  );
  canvas.parent(Container);
  canvas.style("display", "block");
}

// draw loop
function draw() {
  background("#18181b");

  //sets up the player
  player.display();
  player.move();

  // the food
  for (let i = 0; i < food.length; i++) {
    food[i].move();
    food[i].eaten();
    food[i].display();

    if (food[i].status == "depleted") {
      food.splice(i, 1);
    }
  }
}

// UI & UX FUNCTIONS //

// readjusts the canvas size if the screen has changed
function windowResized() {
  resizeCanvas(windowWidth * scaleFactor, windowHeight * scaleFactor);
}

// TODO:  should the player have to press a button to eat? this can be the proxy for fitness
// food starts with one color and then changes to green / alpha before disappearing
