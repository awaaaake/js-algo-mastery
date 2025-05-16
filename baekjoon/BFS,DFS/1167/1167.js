const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [[N], ...edgeInfo] = input;
const graph = Array.from({ length: N + 1 }, () => []);

for (let [node, ...edge] of edgeInfo) {
  for (let i = 0; i < edge.length - 1; i += 2) {
    graph[node].push([edge[i], edge[i + 1]]);
  }
}

const dfs = (node, distance) => {
  //노드와 그 노드까지의 거리
  let farthest = [node, distance];
  visited[node] = true;

  for (let [nextNode, weight] of graph[node]) {
    if (visited[nextNode]) continue;
    const currentFarthest = dfs(nextNode, distance + weight);
    if (currentFarthest[1] > farthest[1]) farthest = currentFarthest;
  }
  return farthest;
};

let visited = new Array(N + 1).fill(false);

//임의의 노드에서 가장 먼 거리 노드를 찾음
const [farthestNode, _] = dfs(1, 0);

//그 노드로부터 다시 가장 먼 노드까지의 거리를 구함
visited = new Array(N + 1).fill(false);
const [, diameter] = dfs(farthestNode, 0);

console.log(diameter);
