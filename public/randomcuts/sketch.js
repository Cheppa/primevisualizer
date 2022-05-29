const lineWidth = 1;
const diameter = 300;

// The statements in the setup() function
// execute once when the program begins
function setup() {
    createCanvas(720, 600); // Size must be the first statement

    frameRate(30);
    background(0); // Set the background to black
    fill(0);
    textFont("Arial");
    textSize(18);
    textAlign(LEFT, TOP);
}

function randomPointInCircle() {
    const radius = diameter / 2;
    const pt_angle = Math.random() * 2 * Math.PI;
    const pt_radius_sq = Math.random() * radius * radius;
    const pt_x = Math.sqrt(pt_radius_sq) * Math.cos(pt_angle);
    const pt_y = Math.sqrt(pt_radius_sq) * Math.sin(pt_angle);
    return {
        x: pt_x + width / 2,
        y: pt_y + height / 2,
    };
}
let lineCount = 0;
function draw() {
    const treshold = 40000;
    const a = Math.round(Math.min(255, 1 + (lineCount > treshold ? lineCount - treshold : 0) / 5000));
    stroke(255, a); // Set line drawing color to white

    for (let i = 0; i < 150; i++) {
        lineCount++;
        const { x, y } = randomPointInCircle();
        const angle = Math.random() * 2 * Math.PI;
        line(
            x + Math.cos(angle) * diameter,
            y + Math.sin(angle) * diameter,
            x + Math.cos(angle) * -diameter,
            y + Math.sin(angle) * -diameter
        );
    }

    noFill();
    stroke(color(255, 0, 0), 50); // Set line drawing color to white
    circle(width / 2, height / 2, diameter);
    stroke(color(255, 255, 255), 255); // Set line drawing color to white
    fill(22);
    noStroke();
    rect(0, 0, width, 22);
    fill(255);
    text(a + " Lines: " + lineCount, 3, 3);
}
