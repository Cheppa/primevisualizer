let primes = [2];

const minLineWidth = 5;

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
  createCanvas(720, 400); // Size must be the first statement

  // Set text characteristics
  textFont("Arial");
  textSize(40);
  textAlign(LEFT, TOP);

  stroke(128); // Set line drawing color to white
  frameRate(30);
}
// The statements in draw() are executed until the
// program is stopped. Each statement is executed in
// sequence and after the last line is read, the first
// line is executed again.
function draw() {
  background(0); // Set the background to black

  fill(255);
  text(maxPrime(), 3, 3);

  if (primes.length < width) {
    let newPrime = primes[primes.length - 1] + 1;
    while (!isPrime(newPrime)) {
      newPrime++;
    }
    primes.push(newPrime);
  }
  primes.forEach((prime, i) => {
    line(i, height, i, height - (prime / maxPrime()) * height);
  });
  line(0, height, width, 0);
}
