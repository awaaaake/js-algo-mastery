//가능한 모든 경로 다찾아보기?
const input = require("fs")
  .readFileSync("./baekjoon/class2/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift();
const edgeInfo = input.map((row) => row.split(" ").map(Number));
const nodeMap = new Map();
for (let [p, c, w] of edgeInfo) {
  if (nodeMap.has(p)) {
    nodeMap.get(p).push([c, w]);
  } else {
    nodeMap.set(p, [[c, w]]);
  }

  if (nodeMap.has(c)) {
    nodeMap.get(c).push([p, w]);
  } else {
    nodeMap.set(c, [[p, w]]);
  }
}
//특정노드에 연결된 간선정보를 모두 저장한다(부모자식 상관없이)
const dfs = (node, distance) => {
  visited[node] = true;
  let farthest = [node, distance]; //가장 먼 노드와 그 거리
  connectionNodes = nodeMap.get(node);

  for (let [nextNode, nextDistance] of connectionNodes) {
    if (visited[nextNode]) continue;
    const currentFarthest = dfs(nextNode, distance + nextDistance);
    if (currentFarthest[1] > farthest[1]) farthest = currentFarthest;
  }
  return farthest;
};

let visited = new Array(n + 1).fill(false);

//임의의 노드에서 가장 먼 거리 노드를 찾음
const [farthestNode, _] = dfs(1, 0);
console.log(farthestNode);
//그 노드로부터 다시 가장 먼 노드까지의 거리를 구함
visited = new Array(n + 1).fill(false);
const [, treeDiameter] = dfs(farthestNode, 0);

console.log(treeDiameter);
