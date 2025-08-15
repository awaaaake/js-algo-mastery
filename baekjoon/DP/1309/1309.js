const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin", "utf-8")
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const dp = Array.from({ length: N }, () => [0, 0, 0]);
//가로 한줄에 최대 2마리
dp[0] = [1, 2]; //[0마리, 1마리] 배치하는 경우
const MOD = 9901;
for (let i = 1; i < N; i++) {
  dp[i][0] = (dp[i - 1][0] + dp[i - 1][1]) % MOD;
  dp[i][1] = (dp[i - 1][0] * 2 + dp[i - 1][1]) % MOD;
}
const sum = dp[N - 1].reduce((acc, cur) => acc + cur, 0);
console.log(sum % MOD);
