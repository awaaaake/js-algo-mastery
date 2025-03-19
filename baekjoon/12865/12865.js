const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [N, K] = input.shift();
const dp = Array.from({ length: N + 1 }, () => new Array(K + 1).fill(0));
for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= K; j++) {
    //현재 배낭의 용량
    const [w, v] = input[i - 1];
    dp[i][j] =
      j >= w ? Math.max(dp[i - 1][j], dp[i - 1][j - w] + v) : dp[i - 1][j];
  }
}
console.log(dp[N][K]);
