const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/class2/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");

const str1 = input[0];
const str2 = input[1];

const dp = Array.from(Array(str1.length + 1), () =>
  Array(str2.length + 1).fill(0)
); //각 문자열의 길이별 최장 공통 부분 수열의 길이 -> str1의 길이가 i개일때, str2의 길이가 j개일 때 LCS

for (let i = 1; i <= str1.length; i++) {
  for (let j = 1; j <= str2.length; j++) {
    if (str1[i - 1] === str2[j - 1]) {
      dp[i][j] = dp[i - 1][j - 1] + 1;
    } else {
      dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
}

console.log(dp[str1.length][str2.length]);
