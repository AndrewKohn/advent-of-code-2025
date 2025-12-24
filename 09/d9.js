"use strict";

const fs = require("fs");
const path = require("path");
const file = "data.txt";
// const file = "test_data.txt";

const getData = (file) => {
    return fs.readFileSync(path.resolve(__dirname, file), "utf8");
};

function p1MovieTheater() {
    const tiles = getData(file)
        .split("\n")
        .filter(Boolean)
        .map((str) => {
            const [x, y] = str.split(",").map((num) => Number(num.trim()));

            return [x, y];
        });

    let best = 0;

    for (let i = 0; i < tiles.length; i++) {
        const [x1, y1] = tiles[i];

        for (let j = i + 1; j < tiles.length; j++) {
            const [x2, y2] = tiles[j];
            const width = Math.abs(x1 - x2) + 1;
            const height = Math.abs(y1 - y2) + 1;
            const area = width * height;

            best = Math.max(best, area);
        }
    }

    return best;
}

function p2MovieTheater() { }

console.log([p1MovieTheater(), p2MovieTheater()]);
