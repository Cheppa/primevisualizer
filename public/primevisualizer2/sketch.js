const Height = 600;
const Width = 900;

let primes = [2];
let diff = [0];

let counts = [0];
let biggestDiff = 0;

let floaters = [];

const strokeWidth = 10;
const lineWidth = strokeWidth + 1;

const maxBottomGraphHeight = 80;

const threshold = 30;

const topGraphMarginTop = 30;
const topGraphHeight = Height - maxBottomGraphHeight - topGraphMarginTop - 20;

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

let repeat = 1;
let fpsValue = 30;
let maxNewDiffs = 30;

// The statements in the setup() function
// execute once when the program begins
function setup() {
  createCanvas(Width, Height); // Size must be the first statement
  strokeCap(SQUARE);

  // Set text characteristics
  textFont("Arial");

  stroke(128); // Set line drawing color to white

  const timesE = document.getElementById("times");
  const fpsE = document.getElementById("fps");
  const maxNewDiffsE = document.getElementById("maxnewdiffs");

  fpsE.addEventListener("input", (e) => {
    fpsValue = Number(e.target.value);
    frameRate(fpsValue);
  });
  timesE.addEventListener("input", (e) => {
    repeat = Number(e.target.value);
  });
  maxNewDiffsE.addEventListener("input", (e) => {
    maxNewDiffs = Number(e.target.value);
  });

  fps = Number(fpsE.value);
  repeat = Number(timesE.value);
  maxNewDiffs = Number(maxNewDiffsE.value);

  frameRate(fpsValue);
}
// The statements in draw() are executed until the
// program is stopped. Each statement is executed in
// sequence and after the last line is read, the first
// line is executed again.
function draw() {
  background(0); // Set the background to black

  fill(255);
  textSize(20);
  textAlign(LEFT, TOP);
  text(maxPrime(), 2, 2);

  for (let i = 0; i < repeat; i++) {
    let newPrime = primes[primes.length - 1] + 1;
    while (!isPrime(newPrime)) {
      newPrime++;
    }
    if (primes.length >= maxNewDiffs) {
      diff.splice(0, primes.length - maxNewDiffs);
      floaters.splice(0, primes.length - maxNewDiffs);
      primes.splice(0, primes.length - maxNewDiffs);
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
  }

  const countsStrokeWeight = Math.min(20, (width - 20) / counts.length);
  let maxCount = 1;
  let maxCountIndex = 0;
  counts.forEach((count, index) => {
    if (count > maxCount) {
      maxCount = count;
      maxCountIndex = index;
    }
  });

  counts.forEach((count, i) => {
    strokeWeight(1);
    textSize(10);
    textAlign(CENTER, BOTTOM);
    text(String(i), 10 + i * countsStrokeWeight, topGraphMarginTop);

    if (maxCountIndex === i) {
      textAlign(CENTER, BOTTOM);
      textSize(14);
      text(
        String(maxCount),
        10 + i * countsStrokeWeight,
        45 + (count / maxCount) * topGraphHeight
      );
    }
    strokeWeight(countsStrokeWeight);
    line(
      10 + i * countsStrokeWeight,
      topGraphMarginTop,
      10 + i * countsStrokeWeight,
      topGraphMarginTop + (count / maxCount) * topGraphHeight
    );
  });

  let realStrokeWidth = strokeWidth;
  let realLineWidth = lineWidth;
  if (strokeWidth * maxNewDiffs > width) {
    realStrokeWidth = width / maxNewDiffs;
    realLineWidth = width / maxNewDiffs;
  }
  diff.forEach((value, i) => {
    strokeWeight(realStrokeWidth);

    if (biggestDiff > maxBottomGraphHeight) {
      line(
        i * realLineWidth,
        height,
        i * realLineWidth,
        height - (value / biggestDiff) * maxBottomGraphHeight
      );
    } else {
      line(i * realLineWidth, height, i * realLineWidth, height - value);
    }

    strokeWeight(1);
    if (floaters[i] > 0) {
      textSize(14);
      textAlign(LEFT, BOTTOM);
      text(String(floaters[i]), i * realLineWidth, height - floaters[i] - 2);
    }
  });

  textSize(18);
  textAlign(RIGHT, BOTTOM);

  strokeWeight(1);
  if (biggestDiff > maxBottomGraphHeight) {
    stroke(128);
    line(
      0,
      height - maxBottomGraphHeight,
      width,
      height - maxBottomGraphHeight
    );
    text(String(biggestDiff), width - 3, height - maxBottomGraphHeight);
  } else {
    stroke(64);
    line(
      0,
      height - maxBottomGraphHeight,
      width,
      height - maxBottomGraphHeight
    );
    stroke(128);
    line(0, height - biggestDiff, width, height - biggestDiff);
    text(String(biggestDiff), width - 3, height - biggestDiff - 3);
  }
}
