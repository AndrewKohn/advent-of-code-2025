"use strict";

const fs = require("fs");
const path = require("path");
const file = "data.txt";
// const file = "test_data.txt";

const getData = (file) => {
    return fs.readFileSync(path.resolve(__dirname, file), "utf8");
};

function p1Laboratories() {
    const grid = getData(file)
        .split("\n")
        .filter(Boolean)
        .map((row) => row.split(""));
    const rows = grid.length;
    const cols = grid[0].length;
    let rowStart = -1,
        colStart = -1;

    for (let row = 0; row < rows; row++) {
        const col = grid[row].indexOf("S");

        if (col !== -1) {
            rowStart = row;
            colStart = col;
            break;
        }
    }

    const beams = new Set([colStart]);
    let splitBeams = 0;

    for (let row = rowStart + 1; row < rows && beams.size > 0; row++) {
        let changed = true;

        while (changed) {
            changed = false;

            for (const col of [...beams]) {
                if (col < 0 || col >= cols) {
                    beams.delete(col);
                    changed = true;
                    continue;
                }

                if (grid[row][col] === "^") {
                    splitBeams++;
                    beams.delete(col);
                    beams.add(col - 1);
                    beams.add(col + 1);
                    changed = true;
                }
            }
        }
    }

    return splitBeams;
}

function p2Laboratories() {
    const grid = getData(file)
        .trimEnd()
        .split("\n")
        .filter(Boolean)
        .map((row) => row.split(""));

    const rows = grid.length;
    const cols = grid[0].length;

    let rowStart = -1;
    let colStart = -1;

    for (let row = 0; row < rows; row++) {
        const col = grid[row].indexOf("S");
        if (col !== -1) {
            rowStart = row;
            colStart = col;
            break;
        }
    }

    if (rowStart === -1) throw new Error("No S found in input.");

    const beams = new Map([[colStart, 1]]);
    let timelines = 0;

    for (let row = rowStart + 1; row < rows && beams.size > 0; row++) {
        let changed = true;

        while (changed) {
            changed = false;

            for (const col of Array.from(beams.keys())) {
                const count = beams.get(col) ?? 0;

                if (count === 0) {
                    beams.delete(col);
                    continue;
                }

                if (col < 0 || col >= cols) {
                    timelines += count;
                    beams.delete(col);
                    changed = true;
                    continue;
                }

                if (grid[row][col] === "^") {
                    beams.delete(col);

                    const left = col - 1;
                    const right = col + 1;

                    beams.set(left, (beams.get(left) ?? 0) + count);
                    beams.set(right, (beams.get(right) ?? 0) + count);

                    changed = true;
                }
            }
        }
    }

    for (const count of beams.values()) timelines += count;

    return timelines;
}

console.log([p1Laboratories(), p2Laboratories()]);
