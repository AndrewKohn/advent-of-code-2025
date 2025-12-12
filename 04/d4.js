"use strict";

const fs = require("fs");
const path = require("path");
const file = "data.txt";
// const file = "test_data.txt";

const getData = (file) => {
    return fs.readFileSync(path.resolve(__dirname, file), "utf8");
};

function p1PrintingDepartment() {
    const grid = getData(file).split("\n").filter(Boolean);
    const rows = grid.length;
    const cols = grid[0].length;

    const inBounds = (row, col) => {
        return row >= 0 && row < rows && col >= 0 && col < cols;
    };

    const DIRS = {
        NW: [-1, -1],
        N: [-1, 0],
        NE: [-1, 1],
        W: [0, -1],
        E: [0, 1],
        SW: [1, -1],
        S: [1, 0],
        SE: [1, 1],
    };

    let accessible = 0;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col] !== "@") continue;

            let neighbors = 0;
            for (const [dr, dc] of Object.values(DIRS)) {
                const nr = row + dr;
                const nc = col + dc;

                if (inBounds(nr, nc) && grid[nr][nc] === "@") neighbors++;
            }

            if (neighbors < 4) accessible++;
        }
    }

    return accessible;
}

function p2PrintingDepartment() {
    const grid = getData(file)
        .split("\n")
        .filter(Boolean)
        .map((row) => row.trim().split(""));
    const rows = grid.length;
    const cols = grid[0].length;

    const inBounds = (row, col) => {
        return row >= 0 && row < rows && col >= 0 && col < cols;
    };

    const DIRS = {
        NW: [-1, -1],
        N: [-1, 0],
        NE: [-1, 1],
        W: [0, -1],
        E: [0, 1],
        SW: [1, -1],
        S: [1, 0],
        SE: [1, 1],
    };

    const countNeighbors = (row, col) => {
        let neighbors = 0;
        for (const [dr, dc] of Object.values(DIRS)) {
            const nr = row + dr;
            const nc = col + dc;

            if (inBounds(nr, nc) && grid[nr][nc] === "@") neighbors++;
        }

        return neighbors;
    };

    let totalRemoved = 0;

    while (true) {
        const toRemove = [];

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (grid[row][col] !== "@") continue;
                const neighbors = countNeighbors(row, col);

                if (neighbors < 4) {
                    toRemove.push([row, col]);
                }
            }
        }

        if (toRemove.length === 0) break;

        for (const [row, col] of toRemove) {
            grid[row][col] = ".";
        }

        totalRemoved += toRemove.length;
    }

    return totalRemoved;
}

console.log(p1PrintingDepartment());
console.log(p2PrintingDepartment());
