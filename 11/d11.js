"use strict";

const fs = require("fs");
const path = require("path");
const file = "data.txt";
// const file = "test_data.txt";

const getData = (file) => {
    return fs.readFileSync(path.resolve(__dirname, file), "utf8");
};

// TODO : know more about DFS & memoization
function p1Reactor() {
    const serverRack = getData(file).split("\n").filter(Boolean);
    const graph = {};

    for (const line of serverRack) {
        const [node, rest] = line.split(": ");
        graph[node] = rest.split(" ");
    }
    // console.log(graph);

    function dfs(node) {
        if (node === "out") return 1;

        let count = 0;

        for (const next of graph[node] || []) {
            count += dfs(next);
        }

        return count;
    }

    return dfs("you");
}

function p2Reactor() {
    const serverRack = getData(file).split("\n").filter(Boolean);
    const graph = {};
    const memo = new Map(); // key: node|dac|fft

    for (const line of serverRack) {
        const [node, rest] = line.split(": ");
        graph[node] = rest.split(" ");
    }
    // console.log(graph);

    function dfs(node, seenDac, seenFft) {
        if (node === "dac") seenDac = true;
        if (node === "fft") seenFft = true;
        if (node === "out") {
            return seenDac && seenFft ? 1 : 0;
        }

        const key = `${node}|${seenDac ? 1 : 0}|${seenFft ? 1 : 0}`;
        if (memo.has(key)) return memo.get(key);

        let count = 0;

        for (const next of graph[node] || []) {
            count += dfs(next, seenDac, seenFft);
            console.log(next);
        }

        memo.set(key, count);
        return count;
    }

    return dfs("svr", false, false);
}

console.log([p1Reactor(), p2Reactor()]);
