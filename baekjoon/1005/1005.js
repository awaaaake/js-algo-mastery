const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

let [T] = input.shift();
let idx = 0;
const answers = [];

while (T > 0) {
  const [N, K] = input[idx];
  const Delay = [0, ...input[idx + 1]];
  const [W] = input[idx + K + 2];
  const graph = Array.from({ length: N + 1 }, () => []);
  const inDegree = new Array(N + 1).fill(0);

  for (let i = idx + 2; i < idx + K + 2; i++) {
    const [s, e] = input[i];
    graph[s].push(e);
    inDegree[e]++;
  }

  const dp = new Array(N + 1).fill(0); //각 건물을 짓는데 필요한 최소시간(선행 조건 포함)
  const queue = [];

  //진입차수가 0인 건물부터 시작(먼저 지을 수 있는 건물들)
  for (let i = 1; i <= N; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
      dp[i] = Delay[i];
    }
  }

  //위상 정렬
  while (queue.length > 0) {
    const current = queue.shift();

    for (const next of graph[current]) {
      inDegree[next]--;

      // 다음 건물까지 필요한 최소 시간을 갱신 (최대 시간 사용)
      dp[next] = Math.max(dp[next], dp[current] + Delay[next]);

      if (inDegree[next] === 0) {
        queue.push(next);
      }
    }
  }

  answers.push(dp[W]);
  idx += K + 3;
  T--;
}

console.log(answers.join("\n"));
