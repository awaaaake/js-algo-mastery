//가능한 모든 경로 다찾아보기?
const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift();
const graph = Array.from({ length: n + 1 }, () => []);

for (let i = 0; i < input.length; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  graph[a].push(b);
  graph[b].push(a);
}

const visited = Array(n + 1).fill(false);
const dp = Array.from({ length: n + 1 }, () => [0, 1]); //i번 노드가 [어답터가 아닐 경우, 어답터일 경우] 최소 어답터 수

//특정 노드가 어답터가 아니면, 자식은 반드시 어답터
//노드가 어답터이면, 자식은 어답터 OR 비어답터 중 최소값
function dfs(node) {
  visited[node] = true;

  for (const next of graph[node]) {
    if (!visited[next]) {
      dfs(next);

      dp[node][0] += dp[next][1];
      dp[node][1] += Math.min(dp[next][0], dp[next][1]);
    }
  }
}

//1을 기준으로 전체 트리를 순회해서 최소 어답터수를 구한다 dp[1]
dfs(1);
console.log(Math.min(dp[1][0], dp[1][1]));
console.log(dp);
