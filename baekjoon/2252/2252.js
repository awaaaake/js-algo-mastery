const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((r) => r.split(" ").map(Number));

const [N, M] = input.shift();

//모든 학생들을 키순서로 줄세운다.
//사이클 없는 무방향그래프에서 모든 정점들을 나열하기
const inDegree = Array(N + 1).fill(0);
const graph = Array.from({ length: N + 1 }, () => []);

for (let [a, b] of input) {
  inDegree[b]++;
  graph[a].push(b);
}

const queue = [];

for (let i = 1; i <= N; i++) {
  if (inDegree[i] === 0) queue.push(i);
}

const result = [];
while (queue.length) {
  const curr = queue.pop(); //우선순위 큐가 아니면, 앞에서 부터 제거
  result.push(curr);

  for (let next of graph[curr]) {
    inDegree[next]--;
    if (inDegree[next] === 0) {
      queue.push(next);
    }
  }
}
console.log(result.join(" "));
