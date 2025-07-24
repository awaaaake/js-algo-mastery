const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [N] = input[0];
const matrices = input.slice(1);

//i ~ j 까지 곱셈 연산의 최솟값
const dp = Array.from({ length: N }, () => Array(N).fill(Infinity));

for (let i = 0; i < N; i++) {
  dp[i][i] = 0;
}
//chainLen: 부분 행렬 수 (2개~n개)
for (let length = 2; length <= N; length++) {
  for (let i = 0; i <= N - length; i++) {
    const j = i + length - 1;

    for (let k = i; k < j; k++) {
      const cost =
        dp[i][k] +
        dp[k + 1][j] +
        matrices[i][0] * matrices[k][1] * matrices[j][1];
      dp[i][j] = Math.min(dp[i][j], cost);
    }
  }
}

console.log(dp[0][N - 1]);
