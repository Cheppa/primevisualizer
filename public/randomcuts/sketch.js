const lineWidth = 5;

// The statements in the setup() function
// execute once when the program begins
function setup() {
  createCanvas(720, 600); // Size must be the first statement

  stroke(255, 10); // Set line drawing color to white
  frameRate(30);
  background(0); // Set the background to black
}

function draw() {

//   fill(255);
//   text(maxPrime(), 3, 3);
    for (let i = 0; i < 100; i++)
    line(Math.random() * width, Math.random() * height,Math.random() * width,Math.random() * height);
}
