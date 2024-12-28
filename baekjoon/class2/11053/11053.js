const input = require("fs")
  .readFileSync("./baekjoon/class2/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");
const N = +input[0];
const numArr = input[1].split(" ").map(Number);
const dp = new Array(N).fill(1);
for (let i = 0; i < N; i++) {
  let max = 0;
  for (let j = 0; j < i; j++) {
    if (numArr[j] < numArr[i]) {
      max = Math.max(dp[j], max);
    }
  }
  dp[i] = max + 1;
}
console.log(Math.max(...dp));
