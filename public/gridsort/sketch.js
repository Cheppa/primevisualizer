const cellSize = 10;
const Cols = 100;
const Rows = 100;
const zoom = 1;

let grid = {};

function setup() {
    createCanvas(Cols * cellSize, Rows * cellSize); // Size must be the first statement
    frameRate(18);

    textAlign(LEFT, TOP);
    // strokeCap(SQUARE);
    // strokeWeight(1);
    // stroke(111); // Set line drawing color to white
    generateGrid();

    const root = document.getElementById("root");
    root.style.width = `${String(cellSize * Cols * zoom)}px`;
    root.style.height = `${String(cellSize * Rows * zoom)}px`;
}

function gridLoop(callback) {
    if (callback) {
        for (let row = 0; row < Rows; row++) {
            for (let col = 0; col < Cols; col++) {
                callback(row, col);
            }
        }
    }
}
function generateGrid() {
    gridLoop((row, col) => {
        // if (Math.random() < 0.8) {
        // if (Math.random() < 0.3) {
        setGrid(row, col, createActor());
        // }
    });
}

function setGrid(row, col, value) {
    if (typeof grid[row] === "undefined") {
        grid[row] = {};
    }
    grid[row][col] = value;
}

function getGrid(row, col) {
    if (grid[row]) {
        return grid[row][col];
    } else return null;
}

function draw() {
    background(128); // Set the background to black
    // console.log(grid);
    noStroke();
    for (let row = 0; row < Rows; row++) {
        for (let col = 0; col < Cols; col++) {
            const actor = getGrid(row, col);
            if (actor) {
                fill(...actor.color);
                rect(col * cellSize, row * cellSize, cellSize, cellSize);
                // ellipse(cellSize / 2 + col * cellSize, cellSize / 2 + row * cellSize, 30, 30);
            }
        }
    }
    let newGrid = deepCopy(grid);
    gridLoop((row, col) => {
        // Oletetaan että herp derp
        // let lC = Object.assign({}, grid[row - 1][col]);
        if (col > 0) {
            // let lC = deepCopy(newGrid[row]?.[col - 1]);
            // let rC = deepCopy(newGrid[row]?.[col]);
            let lC = newGrid[row]?.[col - 1];
            let rC = newGrid[row]?.[col];
            if (rC) {
                let move = false;
                if (!lC) {
                    move = true;
                } else {
                    // const rr = rC.color?.[0];
                    // const lr = lC.color?.[0];
                    // const rg = rC.color?.[1];
                    // const lg = lC.color?.[1];
                    // const rb = rC.color?.[2];
                    // const lb = lC.color?.[2];
                    // if (lr < rr) {
                    //     // console.log(lC.color?.[0], rC.color?.[0]);
                    //     move = true;
                    //     // newGrid[row][col - 1] = rC;
                    //     // newGrid[row][col] = lC;
                    // } else if (lg < rg) {
                    //     move = true;
                    // }

                    let color = "red";
                    let max = 0;
                    const rr = rC.color?.[0];
                    const lr = lC.color?.[0];
                    max = Math.max(rr, lr);

                    const rg = rC.color?.[1];
                    const lg = lC.color?.[1];
                    if (max < Math.max(rg, lg)) {
                        color = "green";
                        max = Math.max(rg, lg);
                    }

                    const rb = rC.color?.[2];
                    const lb = lC.color?.[2];
                    if (max < Math.max(rb, lb)) {
                        color = "blue";
                        max = Math.max(rb, lb);
                    }
                    if ((color = "red")) {
                        // Sort with red
                        if (lr > rr) {
                            move = true;
                        }
                    } else if ((color = "green")) {
                        // Green
                        if (lg > rg) {
                            move = true;
                        }
                    } else if ((color = "blue")) {
                        if (lb > rb) {
                            move = true;
                        }
                    }
                }
                if (move) {
                    newGrid[row][col - 1] = rC;
                    newGrid[row][col] = lC;
                }
            }
        }
        if (row > 0) {
            // let lC = deepCopy(newGrid[row]?.[col - 1]);
            // let rC = deepCopy(newGrid[row]?.[col]);
            let lC = newGrid[row - 1]?.[col];
            let rC = newGrid[row]?.[col];
            if (rC) {
                let move = false;
                if (!lC) {
                    move = true;
                } else {
                    const sumR = rC.color.reduce((prev, current) => current + prev);
                    const sumL = lC.color.reduce((prev, current) => current + prev);
                    if (sumL < sumR) {
                        move = true;
                    }
                }
                if (move) {
                    newGrid[row - 1][col] = rC;
                    newGrid[row][col] = lC;
                }
            }
        }
    });
    grid = newGrid;
}

function deepCopy(object) {
    return JSON.parse(JSON.stringify(object));
}

function mouseClicked() {
    if (mouseX < width && mouseY < height) {
        const row = clamp(Math.floor(mouseY / cellSize), 0, height - 1);
        const col = clamp(Math.floor(mouseX / cellSize), 0, width - 1);

        if (!grid[row][col]) {
            // createActor();
        }
    }
}

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, Math.floor(value)));
}

function randomColor() {
    const rangeSize = 256;
    return [
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * rangeSize),
        Math.floor(Math.random() * rangeSize) + 256 - rangeSize,
    ].sort((a, b) => Math.random() < 0.5);
}

function createActor() {
    const color = randomColor();
    return {
        color,
    };
}
