const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [V, E] = input[0];
const edges = [];
const parent = Array.from({ length: V + 1 }, (_, i) => i);

for (let i = 1; i <= E; i++) {
  const [a, b, cost] = input[i];
  edges.push([cost, a, b]);
}

edges.sort((a, b) => a[0] - b[0]);

const find = (x) => {
  if (parent[x] === x) return x;
  return (parent[x] = find(parent[x]));
};
const union = (a, b) => {
  let rootA = find(a);
  let rootB = find(b);
  if (rootA !== rootB) {
    a < b ? (parent[rootB] = rootA) : (parent[rootA] = rootB);
  }
};

let totalCost = 0;
for (let [cost, a, b] of edges) {
  if (find(a) !== find(b)) {
    union(a, b);
    totalCost += cost;
  }
}

console.log(totalCost);
