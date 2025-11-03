const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/class2/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");
const N = input.shift();
const connections = new Map();
const parents = new Array(N + 1);

for (let [a, b] of input.map((row) => row.split(" ").map(Number))) {
  const arr = connections.get(a);
  const arr2 = connections.get(b);
  connections.set(a, arr ? [...arr, b] : [b]);
  connections.set(b, arr2 ? [...arr2, a] : [a]);
}

let queue = [1];
while (queue.length > 0) {
  let start = queue.shift();
  for (let val of connections.get(start)) {
    if (parents[val]) continue;
    parents[val] = start;
    queue.push(val);
  }
}

for (let i = 2; i <= N; i++) {
  console.log(parents[i]);
}

