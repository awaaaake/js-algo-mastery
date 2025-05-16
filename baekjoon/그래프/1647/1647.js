const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [N, M] = input[0];
const edges = [];
let parent = Array.from({ length: N + 1 }, (_, i) => i);

const find = (x) => {
  if (parent[x] === x) return x;
  return (parent[x] = find(parent[x]));
};

const union = (a, b) => {
  const rootA = find(a);
  const rootB = find(b);
  if (rootA !== rootB) {
    a < b ? (parent[rootB] = rootA) : (parent[rootA] = rootB);
  }
};

for (let i = 1; i <= M; i++) {
  const [a, b, cost] = input[i];
  edges.push([cost, a, b]);
}

edges.sort((a, b) => a[0] - b[0]);
let totalCost = 0;
let maxCost = 0;
for (let [cost, a, b] of edges) {//간선의 비용이 작은것 부터
  if (find(a) !== find(b)) {
    union(a, b);
    totalCost += cost;
    maxCost = cost;
  }
}

console.log(totalCost - maxCost);
