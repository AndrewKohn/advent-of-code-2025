"use strict";

const fs = require("fs");
const path = require("path");
const file = "data.txt";
// const file = "test_data.txt";

const getData = (file) => {
  return fs.readFileSync(path.resolve(__dirname, file), "utf8");
};

function p1SecretEntrance() {
  const data = getData(file).split("\n");
  let pointer = 50,
    count = 0;
  const SIZE = 100;

  for (let i = 0; i < data.length - 1; i++) {
    const dir = data[i][0];
    const turn = Number(data[i].slice(1));

    if (dir === "L") {
      pointer = (pointer - turn) % SIZE;
    } else {
      pointer = (pointer + turn) % SIZE;
    }

    if (pointer === 0) {
      count++;
    }

    // console.log(`${i}:  [${dir}, ${turn}], pointer = ${pointer}`);
  }

  return count;
}

function p2SecretEntrance() {
  const data = getData(file).split("\n").filter(Boolean);
  let pointer = 50,
    count = 0;
  const SIZE = 100;

  for (let i = 0; i < data.length; i++) {
    const dir = data[i][0];
    const turn = Number(data[i].slice(1));
    let hits = 0;

    if (dir === "L") {
      let k = pointer === 0 ? SIZE : pointer;
      if (turn >= k) {
        hits = 1 + Math.floor((turn - k) / SIZE);
      }
    } else if (dir === "R") {
      let k = pointer === 0 ? SIZE : SIZE - pointer;
      if (turn >= k) {
        hits = 1 + Math.floor((turn - k) / SIZE);
      }
    } else {
      continue;
    }

    const delta = dir === "L" ? -turn : turn;
    pointer = (pointer + delta) % SIZE;
    pointer = (pointer + SIZE) % SIZE;

    count += hits;
  }

  return count;
}

console.log(p1SecretEntrance());
console.log(p2SecretEntrance());
