const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.trim());

//가장 긴 공통 부분 문자열 : LCS
const first = input[0];
const second = input[1];

const n = first.length;
const m = second.length;
const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= m; j++) {
    if (first[i - 1] === second[j - 1]) {
      dp[i][j] = dp[i - 1][j - 1] + 1;
    }
  }
}
console.log(Math.max(...dp.flat()));
