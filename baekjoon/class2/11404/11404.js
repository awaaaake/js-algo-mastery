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

for (let i = 1; i <= n; i++) {
  graph[i][i] = 0; // 자기 자신으로 가는 경로는 0
}

for (let [s, e, w] of edgeInfo) {
  graph[s][e] = Math.min(graph[s][e], w);
}

//폴로이드-워셜 알고리즘
for (let k = 1; k <= n; k++) {
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      if (graph[i][k] + graph[k][j] < graph[i][j]) {
        graph[i][j] = graph[i][k] + graph[k][j];
      }
    }
  }
}

for (let i = 1; i <= n; i++) {
  console.log(
    graph[i]
      .slice(1)
      .map((val) => (val === Infinity ? 0 : val))//i에서 j로 갈수없는 경우 0출력
      .join(" ")
  );
}
