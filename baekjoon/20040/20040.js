const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [n, m] = input.shift();

const parent = Array.from({ length: n + 1 }, (_, i) => i);

function find(x) {
  if (parent[x] === x) return x;
  return (parent[x] = find(parent[x]));
}

function union(a, b) {
  let rootA = find(a);
  let rootB = find(b);
  if (rootA === rootB) return false;
  a < b ? (parent[rootB] = rootA) : (parent[rootA] = rootB);
  return true;
}

function solve() {
  for (let i = 0; i < input.length; i++) {
    const [n1, n2] = input[i];

    if (!union(n1, n2)) {
      //사이클이생겨서 union이 안되면
      return i + 1;
    }
  }

  return 0;
}

console.log(solve());
