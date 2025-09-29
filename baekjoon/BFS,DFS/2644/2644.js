const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [n] = input[0];
const [a, b] = input[1];
const [m] = input[2];
const graph = Array.from({ length: n + 1 }, () => []);

for (let [x, y] of input.slice(3)) {
  graph[x].push(y);
  graph[y].push(x);
}

const dist = Array(n + 1).fill(-1); //a와 나머지 사람들의 촌수관계
const queue = [a];
dist[a] = 0;

//bfs
while (queue.length) {
  //기준의 a와의 촌수 관계임
  //부모-자식 관계를 통해서 한 단계씩 거리를 뻗어나가면서 촌수를 더해감
  const cur = queue.shift();
  if (cur === target) break;

  for (const next of graph[cur]) {
    if (dist[next] === -1) {
      dist[next] = dist[cur] + 1;
      queue.push(next);
    }
  }
}

console.log(dist[b]);
