const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [n, m] = input.shift();
//같은 집합, 그룹에 속하는지 확인하는 문제
// union-find로 하나의 집합/묶음으로 합치고, 루트를 확인해 같은 집합인지 확인
const parents = Array(n + 1)
  .fill()
  .map((_, i) => i);

const find = (x) => {
  if (parents[x] === x) return x;
  return (parents[x] = find(parents[x]));
};

const union = (a, b) => {
  let rootA = find(a);
  let rootB = find(b);
  if (rootA !== rootB) {
    rootA < rootB ? (parents[rootA] = rootB) : (parents[rootB] = rootA);
  }
};

for (let [cal, a, b] of input) {
  if (cal === 0) {
    if (find(a) !== find(b)) union(a, b);
  }

  if (cal === 1) {
    if (find(a) === find(b)) console.log("YES");
    else console.log("NO");
  }
}
