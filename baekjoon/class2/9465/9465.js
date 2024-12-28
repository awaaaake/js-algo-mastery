const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/class2/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");
const T = +input.shift();
for (let i = 0; i < T; i++) {
  const n = +input.shift();
  const numArr = [];
  for (let i = 0; i < 2; i++) {
    numArr.push(input.shift().split(" ").map(Number));
  }
  const dp = Array.from(Array(2), () => new Array(n).fill(0));
  dp[0][0] = numArr[0][0];
  dp[1][0] = numArr[1][0];
  if (n === 1) {
    console.log(Math.max(...dp.flat()));
    continue;
  }

  dp[0][1] = dp[1][0] + numArr[0][1];
  dp[1][1] = dp[0][0] + numArr[1][1];

  for (let j = 2; j < n; j++) {
    for (let i = 0; i < 2; i++) {
      const max = Math.max(
        dp[Math.abs(i - 1)][j - 1],
        dp[Math.abs(i - 1)][j - 2]
      );
      dp[i][j] = max + numArr[i][j];
    }
  }
  console.log(Math.max(...dp.flat()));
}
