const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [N] = input.shift();
const W = input;

const dp = Array.from({ length: N }, () => Array(1 << N).fill(-1)); //도시 N개의 가능한 모든 방문 상태에 대한 비용

const TSP = (current, visited) => {
  //모든 도시를 방문했을 경우
  if (visited === (1 << N) - 1) {
    //기저조건
    return W[current][0] || Infinity;
    //모든 도시를 방문했다면 시작점(0)으로 돌아가는 비용을 더함
    // 다시 시작점으로 돌아갈 수 없는 경우 Infinity
  }

  if (dp[current][visited] !== -1) {
    return dp[current][visited];
  }

  dp[current][visited] = Infinity;
  
  for (let next = 0; next < N; next++) {
    //현재 도시에서 갈수없거나 이미 방문한 도시인 경우 패스
    if (!W[current][next] || visited & (1 << next)) continue;

    //다음 도시로 이동
    dp[current][visited] = Math.min(
      dp[current][visited],
      TSP(next, visited | (1 << next)) + W[current][next]
    );
  }

  return dp[current][visited];
};

//시작도시 0으로 설정하고 탐색 시작
console.log(TSP(0, 1 << 0));
