const input = require("fs")
  .readFileSync("./baekjoon/example.txt")
  .toString()
  .split("\n")
  .map((r) => r.trim());

const A = input[0].trim();
const n = A.length;
const B = input[1].trim();
const m = B.length;

const dp = Array.from(Array(n + 1), () => new Array(m + 1).fill(""));

for (let i = 1; i < n + 1; i++) {
  for (let j = 1; j < m + 1; j++) {
    //i,j는 몇번째글자인지를 의미
    if (A[i - 1] === B[j - 1]) {
      dp[i][j] = dp[i - 1][j - 1] + A[i - 1];
    } else {
      if (dp[i - 1][j].length > dp[i][j - 1].length) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = dp[i][j - 1];
      }
    }
  }
}

console.log(dp[n][m].length);
if (dp[n][m].length > 0) console.log(dp[n][m]); //LCS의 길이가 0인 경우에는 둘째 줄을 출력하지 않는다.
