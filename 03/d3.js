"use strict";

const fs = require("fs");
const path = require("path");
const file = "data.txt";
// const file = "test_data.txt";

const getData = (file) => {
  return fs.readFileSync(path.resolve(__dirname, file), "utf8");
};

function p1Lobby() {
  const data = getData(file);
  const findJoltage = (line) => {
    let joltage = -1,
      tensDigit = -1;

    for (let i = 0; i < line.length; i++) {
      const digit = Number(line[i]);

      if (tensDigit !== -1) {
        const candidate = tensDigit * 10 + digit;

        if (candidate > joltage) {
          joltage = candidate;
        }
      }

      if (digit > tensDigit) {
        tensDigit = digit;
      }
    }

    return joltage;
  };

  const lines = data.trim().split("\n").filter(Boolean);
  let sum = 0;

  for (const line of lines) {
    sum += findJoltage(line);
  }

  return sum;
}

function p2Lobby() {
  const data = getData(file);
  const findJoltage = (line) => {
    const limit = 12;
    let res = "";
    let start = 0;

    for (let pos = 0; pos < limit; pos++) {
      const remaining = limit - pos;
      const end = line.length - remaining;
      let d = "-1";
      let index = start;

      for (let i = start; i <= end; i++) {
        if (line[i] > d) {
          d = line[i];
          index = i;
        }
      }

      res += d;
      start = index + 1;
    }

    return Number(res);
  };

  const lines = data.trim().split("\n").filter(Boolean);
  let sum = 0;

  for (const line of lines) {
    sum += findJoltage(line);
  }

  return sum;
}

console.log("p1:", p1Lobby());
console.log("p2:", p2Lobby());
