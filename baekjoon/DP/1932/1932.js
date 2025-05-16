const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/class2/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");

const N = +input.shift();
const numTree = input.map((row) => row.split(" ").map(Number));
const dp = new Array(N); //dp[i][j] i번쨰줄에서 j번째 수를 선택했을 때 정수 합
dp[0] = numTree[0];

for (let i = 1; i < N; i++) {
  dp[i] = new Array(numTree[i].length);
  for (let j = 0; j < numTree[i].length; j++) {
    if (j === 0) dp[i][j] = dp[i - 1][j] + numTree[i][j];
    else if (j === numTree[i].length - 1)
      dp[i][j] = dp[i - 1][j - 1] + numTree[i][j];
    else dp[i][j] = Math.max(dp[i - 1][j - 1], dp[i - 1][j]) + numTree[i][j];
  }
}

console.log(Math.max(...dp[N - 1]));
