"use strict";

const fs = require("fs");
const path = require("path");
const file = "data.txt";
// const file = "test_data.txt";

const getData = (file) => {
  return fs.readFileSync(path.resolve(__dirname, file), "utf8");
};

function p1GiftShop() {
  const isInvalidId = (num) => {
    const str = String(num);
    if (str.length % 2 !== 0) return false;

    const half = str.length / 2;
    return str.slice(0, half) === str.slice(half);
  };

  const data = getData(file);
  const ranges = data
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((range) => {
      const [start, end] = range.split("-").map(Number);

      return { start, end };
    });

  let sum = 0;

  for (const { start, end } of ranges) {
    // console.log(start, end);
    for (let id = start; id <= end; id++) {
      if (isInvalidId(id)) {
        sum += id;
      }
    }
  }

  return sum;
}

function p2GiftShop() {
  const isInvalidId = (num) => {
    const str = String(num);
    for (let len = 1; len <= Math.floor(str.length / 2); len++) {
      if (str.length % len !== 0) continue;

      const chunk = str.slice(0, len);
      const repeats = str.length / len;

      if (repeats < 2) continue;
      if (chunk.repeat(repeats) === str) {
        return true;
      }
    }

    return false;
  };

  const data = getData(file);
  const ranges = data
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((range) => {
      const [start, end] = range.split("-").map(Number);

      return { start, end };
    });

  let sum = 0;

  for (const { start, end } of ranges) {
    // console.log(start, end);
    for (let id = start; id <= end; id++) {
      if (isInvalidId(id)) {
        sum += id;
      }
    }
  }

  return sum;
}

console.log("p1:", p1GiftShop());
console.log("p2:", p2GiftShop());
