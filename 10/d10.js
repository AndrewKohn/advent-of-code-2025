"use strict";

const fs = require("fs");
const path = require("path");
// const file = "data.txt";
const file = "test_data.txt";

const getData = (file) => {
    return fs.readFileSync(path.resolve(__dirname, file), "utf8");
};

function p1Factory() { }

function p2Factory() { }

console.log([p1Factory(), p2Factory()]);
