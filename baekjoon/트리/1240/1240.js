const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [N, M] = input.shift();
const graph = Array.from({ length: N + 1 }, () => []);

for (let [a, b, w] of input.slice(0, N - 1)) {
  graph[a].push([b, w]);
  graph[b].push([a, w]);
}

const visited = new Array(N + 1).fill(false);

const dfs = (node, dist, target) => {
  if (node === target) return dist;
  visited[node] = true;

  for (let [next, cost] of graph[node]) {
    if (!visited[next]) {
      const result = dfs(next, dist + cost, target);
      if (result !== undefined) return result;
      //현재의 이웃에대해 탐색했을 때 결과가있다면(=target값을 찾았다면) return
    }
  }

  return undefined;
};

for (let [a, b] of input.slice(N - 1, N - 1 + M)) {
  visited.fill(false);
  console.log(dfs(a, 0, b));
}
