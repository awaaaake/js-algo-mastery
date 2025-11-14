const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [n, m] = input[0];
const graph = Array.from({ length: n + 1 }, () => []); //직속 부하
const sum = Array(n + 1).fill(0);

for (let i = 1; i < input[1].length; i++) {
  graph[input[1][i]].push(i + 1);
}

for (let j = 2; j < 2 + m; j++) {
  const [i, w] = input[j];
  sum[i] += w;
}

//서브 트리의 합
function dfs(node) {
  for (const next of graph[node]) {
    //직속 부하(자식)노드에 현재 자신의 점수값을 누적시킴
    sum[next] += sum[node];
    dfs(next);
  }
}

dfs(1);
console.log(sum.slice(1).join(" "));
