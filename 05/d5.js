"use strict";

const fs = require("fs");
const path = require("path");
const file = "data.txt";
// const file = "test_data.txt";

const getData = (file) => {
    return fs.readFileSync(path.resolve(__dirname, file), "utf8");
};

function p1Cafeteria() {
    const data = getData(file).trim().split("\n");
    const ranges = [];
    const ids = [];
    let availableFreshIngredients = 0;

    for (const line of data) {
        if (line.length > 0) {
            if (line.includes("-")) {
                const [start, end] = line.split("-").map(Number);
                ranges.push([start, end]);
            } else {
                ids.push(Number(line));
            }
        }
    }

    const isFresh = (id, ranges) => {
        for (const [start, end] of ranges) {
            if (id >= start && id <= end) return true;
        }

        return false;
    };

    for (const id of ids) {
        if (isFresh(id, ranges)) availableFreshIngredients++;
    }

    return availableFreshIngredients;
}

function p2Cafeteria() {
    const data = getData(file).trim().split("\n");
    const ranges = [];

    for (const line of data) {
        if (!line || !line.includes("-")) continue;

        const [start, end] = line.split("-").map(Number);
        ranges.push({ start, end });
    }

    ranges.sort((a, b) => a.start - b.start);

    let freshIds = 0;
    let currentStart = ranges[0].start;
    let currentEnd = ranges[0].end;

    for (let i = 1; i < ranges.length; i++) {
        const { start, end } = ranges[i];

        if (start <= currentEnd + 1) {
            currentEnd = Math.max(currentEnd, end);
        } else {
            freshIds += currentEnd - currentStart + 1;
            currentStart = start;
            currentEnd = end;
        }
    }

    freshIds += currentEnd - currentStart + 1;

    return freshIds;
}

console.log([p1Cafeteria(), p2Cafeteria()]);
