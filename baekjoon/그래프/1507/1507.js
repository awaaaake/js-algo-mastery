const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [N] = input[0];
const dist = input.slice(1); //도시 간의 거리 행렬
const need = Array.from({ length: N }, () => Array(N).fill(true)); //i->j로 가는 직접 간선이 필요한가
let answer = 0;

for (let k = 0; k < N; k++) {
  for (let i = 0; i < N; i++) {
    for (let j = i; j < N; j++) {
      //자기 자신으로 가는 최단거리, 중간 노드가 출발점 또는 도착점과 같은 경우는 -> 직접 간선 유무를 따질필요x
      if (i === j || i === k || j === k) continue;
      if (dist[i][j] > dist[i][k] + dist[k][j]) {
        //거쳐가는 길을 활용하면 되므로, i-j사이에 직접간선이 필요가x -> 도로의 개수가 최소가 아니게 됨
        console.log(-1);
        return;
      }
      if (dist[i][j] === dist[i][k] + dist[k][j]) {
        //불가능한 건 아님. -> 거쳐가는 비용으로 계산하면 되므로
        need[i][j] = need[j][i] = false;
        //i,j사이에 직접간선이 필요없음
      }
    }
  }
}

for (let i = 0; i < N; i++) {
  for (let j = i + 1; j < N; j++) {
    //i->j === j -> i 같은 경로이므로 j는 i+1부터 시작
    if (need[i][j]) answer += dist[i][j];
  }
}

console.log(answer);
