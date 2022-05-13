const Width = 100;
const Height = 80;
const zoom = 8;

const dilute = 0.1;

let grid = [];

let actors = [];

function generateGrid() {
    grid = [];
    let row = [];
    for (let i = 0; i < Width; i++) {
        row = [];

        for (let j = 0; j < Height; j++) {
            //row.push(Math.random());
            row.push(0);
        }
        grid.push(row);
    }
}

function setup() {
    createCanvas(Width, Height); // Size must be the first statement
    frameRate(20);

    textAlign(LEFT, TOP);
    strokeCap(SQUARE);
    strokeWeight(1);
    stroke(255); // Set line drawing color to white

    generateGrid();

    for (let i = 0; i < 0; i++) {
        createActor(Math.random() * Width, Math.random() * Height);
    }

    const root = document.getElementById("root");
    root.style.width = `${String(Width * zoom)}px`;
    root.style.height = `${String(Height * zoom)}px`;
}

function draw() {
    background(0); // Set the background to black

    for (let x = 0; x < Width; x++) {
        for (let y = 0; y < Height; y++) {
            const val = sample(x, y);

            const strokeColor = val * 255;

            if (grid[x][y] > 0) {
                grid[x][y] = Math.max(0, val - dilute);
            } else {
                grid[x][y] = Math.max(0, val);
            }

            stroke(strokeColor);
            point(0.5 + x, 0.5 + y);
        }
    }
    for (let i = 0; i < actors.length; i++) {
        const a = actors[i];
        a.move();

        grid[Math.floor(a.x)][Math.floor(a.y)] = 1;
        strokeWeight(1);
        stroke(255, 0, 0);
        line(
            a.x,
            a.y,
            a.x + lengthdirX(100, a.direction),
            a.y + lengthdirY(100, a.direction)
        );
    }
}

function keyPressed() {
    //generateGrid();
}

function mouseClicked() {
    if (mouseX < width && mouseY < height) {
        const mX = clamp(Math.floor(mouseX), 0, width - 1);
        const mY = clamp(Math.floor(mouseY), 0, height - 1);

        createActor(mX, mY);
    }
}

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, Math.floor(value)));
}

function createActor(x, y) {
    actors.push(new Actor(x, y));
}

function lengthdirX(len, dir) {
    return len * Math.cos(dir);
}
function lengthdirY(len, dir) {
    return len * Math.sin(dir);
}

class Actor {
    #direction = Math.random() * 360;
    #spd = 2;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    move() {
        const sensorLength = 2;
        const sensorAngle = 10;
        const s1 = sense(
            lengthdirX(sensorLength, this.#direction),
            lengthdirY(sensorLength, this.#direction)
        );
        const s2 = sense(
            lengthdirX(sensorLength, this.#direction - sensorAngle),
            lengthdirY(sensorLength, this.#direction - sensorAngle)
        );
        const s3 = sense(
            lengthdirX(sensorLength, this.#direction + sensorAngle),
            lengthdirY(sensorLength, this.#direction + sensorAngle)
        );

        if (s1 < s2 && s1 < s3) {
            if (s2 > s3) {
                this.#direction = wrapDir(this.#direction - sensorAngle / 10);
            } else {
                this.#direction = wrapDir(this.#direction + sensorAngle / 10);
            }
        }

        const newX = lengthdirX(this.#spd, this.#direction);
        const newY = lengthdirY(this.#spd, this.#direction);
        this.y += newX;
        this.x += newY;
        if (this.y < 0) {
            this.y = Height - 1;
        }
        if (this.x < 0) {
            this.x = Width - 1;
        }
        if (this.y > Height - 1) {
            this.y = 0;
        }
        if (this.x > Width - 1) {
            this.x = 0;
        }
    }
}

function wrapDir(dir) {
    if (dir > 360) {
        return dir - 360;
    }
    if (dir < 0) {
        return dir + 360;
    }
    return dir;
}

function sense(x, y) {
    x = Math.round(x);
    y = Math.round(y);
    if (x < 0) {
        x = Width - 1 - x;
    }
    if (x > Width - 1) {
        x = 0 + x - Width - 1;
    }
    if (y < 0) {
        y = Height - 1 - y;
    }
    if (y > Height - 1) {
        y = 0 + y - Height - 1;
    }

    return sample(x, y);
}

function sample(x, y, range = 1) {
    // const count = (1 + range * 2) * 2;
    const count = 9;
    let sum = 0;
    let c = 0;
    for (let offsetX = -range; offsetX <= range; offsetX++) {
        for (let offsetY = -range; offsetY <= range; offsetY++) {
            let sampleX = x + offsetX;
            let sampleY = y + offsetY;
            if (sampleX < 0) {
                sampleX = Width - 1;
            }
            if (sampleX > Width - 1) {
                sampleX = 0;
            }
            if (sampleY < 0) {
                sampleY = Height - 1;
            }
            if (sampleY > Height - 1) {
                sampleY = 0;
            }

            sum += grid[sampleX][sampleY];
        }
    }
    console.log(c);
    return sum / count;
}
