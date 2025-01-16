const fs = require("fs");
const numArr = fs
  .readFileSync("./baekjoon/class2/example.txt", "utf-8")
  .trim()
  .split("\n")
  .slice(1)
  .map(Number)
const dp = new Array(Math.max(...numArr) + 1);
dp[0] = [1, 0];
dp[1] = [0, 1];

for (let i = 2; i < dp.length; i++) {
  dp[i] = [dp[i - 1][0] + dp[i - 2][0], dp[i - 1][1] + dp[i - 2][1]];
}

for (let number of numArr) {
  console.log(dp[number].join(" "));
}
