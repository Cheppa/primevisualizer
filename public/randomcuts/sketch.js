const lineWidth = 1;
const diameter = 300;

// The statements in the setup() function
// execute once when the program begins
function setup() {
    createCanvas(720, 600); // Size must be the first statement

    frameRate(30);
    background(0); // Set the background to black
    fill(0);
}

function draw() {
    stroke(255, 30); // Set line drawing color to white
    //   text(maxPrime(), 3, 3);

    for (let i = 0; i < 100; i++) {
        const radius = diameter / 2;
        const angle = Math.random() * 360;
        const x = Math.sin(angle) * Math.random() * radius;
        const y = Math.cos(angle) * Math.random() * radius;
        point(width / 2 + x, height / 2 + y);
        // point(x, y);
        // line(
        //     Math.random() * width,
        //     Math.random() * height,
        //     Math.random() * width,
        //     Math.random() * height
        // );
    }

    noFill();
    stroke(color(255, 0, 0), 50); // Set line drawing color to white

    circle(width / 2, height / 2, diameter);
}
