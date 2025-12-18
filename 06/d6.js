"use strict";

const fs = require("fs");
const path = require("path");
const file = "data.txt";
// const file = "test_data.txt";

const getData = (file) => {
    return fs.readFileSync(path.resolve(__dirname, file), "utf8");
};

// NOTE : probably wrong approach but works
// TODO : revisit this problem
function p1TrashCompactor() {
    const data = getData(file).split("\n");
    const homework = [];
    const opsLine = [];

    for (const line of data) {
        if (!line) continue;

        const curr = line.split(" ").filter(Boolean);

        if (!curr.includes("+")) {
            homework.push(curr.map(Number));
        } else {
            opsLine.push(curr);
        }
    }

    const blocks = new Array(homework[0].length)
        .fill(0)
        .map((_, j) => (opsLine[0][j] === "+" ? 0 : 1));

    for (let i = 0; i < homework.length; i++) {
        for (let j = 0; j < homework[i].length; j++) {
            if (opsLine[0][j] === "+") {
                blocks[j] += homework[i][j];
            }

            if (opsLine[0][j] === "*") {
                blocks[j] *= homework[i][j];
            }
        }
    }

    return blocks.reduce((prev, curr) => prev + curr);
}

function p2TrashCompactor() {
    const data = getData(file).split("\n").filter(Boolean);
    if (data.length === 0) return 0;

    const width = Math.max(...data.map((r) => r.length));
    const grid = data.map((r) => r.padEnd(width, " "));
    const rows = grid.length;
    const lastRow = rows - 1;

    const isBlankCol = (c) => {
        for (let r = 0; r < rows; r++) {
            if (grid[r][c] !== " ") return false;
        }
        return true;
    };

    let total = 0;
    let col = width - 1;

    while (col >= 0) {
        while (col >= 0 && isBlankCol(col)) col--;
        if (col < 0) break;

        let start = col;
        while (start >= 0 && !isBlankCol(start)) start--;
        start++;

        const opSlice = grid[lastRow].slice(start, col + 1);
        const op = opSlice.includes("+") ? "+" : "*";

        let result = op === "+" ? 0 : 1;

        for (let c = col; c >= start; c--) {
            let digits = "";
            for (let r = 0; r < lastRow; r++) {
                const ch = grid[r][c];
                if (ch >= "0" && ch <= "9") digits += ch;
            }

            if (digits.length > 0) {
                const n = Number(digits);
                result = op === "+" ? result + n : result * n;
            }
        }

        total += result;
        col = start - 1;
    }

    return total;
}

console.log([p1TrashCompactor(), p2TrashCompactor()]);
