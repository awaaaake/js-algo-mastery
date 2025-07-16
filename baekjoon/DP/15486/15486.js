//25분
const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [N] = input[0];
const counsels = input.slice(1);
// 하루에 하나씩 서로 다른 사람의 상담
const dp = new Array(N + 2).fill(0); //i일까지의 상담을 고려했을 때 최대 수익

for (let i = 1; i <= N; i++) {
  const T = counsels[i - 1][0];
  const P = counsels[i - 1][1];

  //i번째 날 상담을 하는 경우
  if (i + T - 1 <= N) {
    dp[i + T] = Math.max(dp[i + T], dp[i] + P);
  }

  //i번째 날 상담을 하지 않는 경우
  dp[i + 1] = Math.max(dp[i + 1], dp[i]);
}
console.log(dp[N + 1]);
