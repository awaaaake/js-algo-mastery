const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/class2/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift();
const m = +input.shift();
const edgeInfo = input.map((row) => row.split(" ").map(Number));
const graph = Array.from({ length: n + 1 }, () => Array(n + 1).fill(Infinity));

for (let [s, e, w] of edgeInfo) {
  graph[s][e] = Math.min(graph[s][e], w);
}


//폴로이드-워셜 알고리즘
for (let k = 1; k <= n; k++) {
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      if (i === j) graph[i][j] = 0;
      if (graph[i][k] + graph[k][j] < graph[i][j]) {
        graph[i][j] = graph[i][k] + graph[k][j];
      }
    }
  }
}

for (let i = 1; i <= n; i++) {
  console.log(graph[i].slice(1).join(" "));
}

