const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");

//최소의 비용으로 모든 논에 물을 대는 것 = 최소 비용으로 모든 논(정점)을 연결
const n = +input[0];
const dist = input.slice(1, n + 1).map(Number);
const graph = input.slice(n + 1).map((row) => row.split(" ").map(Number));
const visited = Array(n).fill(false);

console.log(dist, graph);
let answer = 0;
for (let _ = 0; _ < n; _++) {
    
  let minNode = -1;
  let minCost = Infinity;

  for (let i = 0; i < n; i++) {
    if (!visited[i] && minCost > dist[i]) {
      minNode = i;
      minCost = dist[i];
    }
  }

  visited[minNode] = true;
  answer += minCost;

  for (let next = 0; next < n; next++) {
    if (!visited[next]) {
      dist[next] = Math.min(dist[next], graph[minNode][next]);
    }
  }
}

console.log(answer);
