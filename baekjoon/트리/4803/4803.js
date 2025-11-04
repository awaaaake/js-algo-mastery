const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/example.txt")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

let caseNum = 1;
let idx = 0;

while (true) {
  const [n, m] = input[idx++];
  if (n === 0 && m === 0) break;

  const graph = Array.from({ length: n + 1 }, () => []);
  const visited = Array(n + 1).fill(false);

  for (let i = 0; i < m; i++) {
    //i를 사용하진 않지만 m번을 카운트하는데 쓰임
    const [a, b] = input[idx++];
    graph[a].push(b);
    graph[b].push(a);
  }

  let treeCnt = 0;

  const dfs = (node, parent) => {
    visited[node] = true;

    for (let next of graph[node]) {
      if (!visited[next]) {
        if (!dfs(next, node)) return false;
        //현재 이웃이 문제가 없다면, 다음 이웃의 트리여부 판단을 위해 return (true)x
      } else if (next !== parent) return false;
    }

    return true;
  };

  for (let i = 1; i <= n; i++) {
    if (!visited[i]) {
      if (dfs(i, 0)) treeCnt++; //0은 부모가 아직 없음을 의미함(dfs 탐색에서 0을 다시 방문할일은x)
    }
  }
  
  if (treeCnt === 0) {
    console.log(`Case ${caseNum}: No trees.`);
  } else if (treeCnt === 1) {
    console.log(`Case ${caseNum}: There is one tree.`);
  } else {
    console.log(`Case ${caseNum}: A forest of ${treeCnt} trees.`);
  }

  caseNum++;
}
