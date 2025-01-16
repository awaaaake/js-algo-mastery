const input = require("fs")
  .readFileSync("./baekjoon/class2/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");

const N = +input.shift();
const costArr = input.map((row) => row.split(" ").map(Number));
const dp = Array.from(Array(N + 1), () => new Array(3).fill(0));
dp[1] = costArr[0];
for (let i = 2; i <= N; i++) {
  dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + costArr[i - 1][0];
  dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + costArr[i - 1][1];
  dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + costArr[i - 1][2];
}

console.log(Math.min(...dp[N]));
