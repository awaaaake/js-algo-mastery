const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

let [T] = input[0];
let i = 1;

//최종파일을 만드는 최소 비용
while (T > 0) {
  const [K] = input[i++];
  const files = input[i++];

  //i부터 j까지 합치는 최소 비용
  const dp = Array.from({ length: K }, () => Array(K).fill(0));

  const prefixSum = Array(K + 1).fill(0);
  for (let i = 0; i < K; i++) {
    prefixSum[i + 1] = prefixSum[i] + files[i];
  }

  for (let length = 2; length <= K; length++) {
    for (let i = 0; i <= K - length; i++) {
      const j = i + length - 1;
      dp[i][j] = Infinity;

      for (let k = i; k < j; k++) {
        const cost = dp[i][k] + dp[k + 1][j] + prefixSum[j + 1] - prefixSum[i];
        dp[i][j] = Math.min(dp[i][j], cost);
      }
    }
  }

  console.log(dp[0][K - 1]);
  T--;
}
