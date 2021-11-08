let primes = [2];
let diff = [0];

let counts = [0];
let biggestDiff = 0;

let floaters = [];

const strokeWidth = 6;
const lineWidth = strokeWidth + 4;

const threshold = 30;

const maxPrime = () => Math.max(...primes);

const isPrime = (number) => {
  if (number <= 1) {
    return false;
  }

  // looping through 2 to number-1
  for (let i = 2; i < number; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
};

// The statements in the setup() function
// execute once when the program begins
function setup() {
  createCanvas(900, 600); // Size must be the first statement

  // Set text characteristics
  textFont("Arial");

  stroke(128); // Set line drawing color to white
  frameRate(60);
}
// The statements in draw() are executed until the
// program is stopped. Each statement is executed in
// sequence and after the last line is read, the first
// line is executed again.
function draw() {
  background(0); // Set the background to black

  fill(255);
  textSize(40);
  textAlign(LEFT, TOP);
  text(maxPrime(), 3, 3);

  let newPrime = primes[primes.length - 1] + 1;
  while (!isPrime(newPrime)) {
    newPrime++;
  }
  if (primes.length >= width / lineWidth) {
    diff.shift();
    primes.shift();
    floaters.shift();
  }
  const newDiff = newPrime - primes[primes.length - 1];
  if (!counts?.[newDiff]) {
    counts[newDiff] = 1;
  } else {
    counts[newDiff]++;
  }
  diff.push(newDiff);
  let floater = 0;
  if (newDiff > biggestDiff) {
    biggestDiff = newDiff;
    floater = newDiff;
  }
  floaters.push(floater);
  primes.push(newPrime);

  const countsStrokeWeight = Math.min(10, width / counts.length);
  let maxCount = 1;
  counts.forEach((count) => {
    if (count > maxCount) {
      maxCount = count;
    }
  });

  counts.forEach((count, i) => {
    strokeWeight(1);
    textSize(10);
    textAlign(LEFT, BOTTOM);
    text(String(i), 5 + i * countsStrokeWeight, 54);

    strokeWeight(countsStrokeWeight);
    line(
      10 + i * countsStrokeWeight,
      60,
      10 + i * countsStrokeWeight,
      60 + (count / maxCount) * 400
    );
  });

  diff.forEach((value, i) => {
    strokeWeight(strokeWidth);
    line(i * lineWidth, height, i * lineWidth, height - value);

    strokeWeight(1);
    if (floaters[i] > 0) {
      textSize(14);
      textAlign(LEFT, BOTTOM);
      text(String(floaters[i]), i * lineWidth, height - floaters[i] - 2);
    }
  });

  textSize(18);
  textAlign(RIGHT, BOTTOM);
  text(String(biggestDiff), width - 3, height - biggestDiff - 3);

  strokeWeight(1);
  line(0, height - biggestDiff, width, height - biggestDiff);
}
