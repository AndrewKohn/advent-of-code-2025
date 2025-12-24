"use strict";

const fs = require("fs");
const path = require("path");
// const file = "data.txt";
const file = "test_data.txt";

const getData = (file) => {
    return fs.readFileSync(path.resolve(__dirname, file), "utf8");
};

// TODO : min/max heap union find type of stuff???
function p1Playground() {
    const boxes = getData(file)
        .trim()
        .split("\n")
        .filter(Boolean)
        .map((line) => {
            const [x, y, z] = line.split(",").map((n) => Number(n.trim()));

            return [x, y, z];
        });

    const n = boxes.length;
    const K = 1000;
    const circuits = boxes.map((_, i) => { });
    const connections = [];

    return connections;
}

function p2Playground() {
    return "asdf";
}

console.log(p1Playground());
console.log(p2Playground());
