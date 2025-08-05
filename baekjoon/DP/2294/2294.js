const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");

const [n, k] = input[0].split(" ").map(Number);
const coins = input.slice(1, 1 + n).map(Number);
//k가치를 만드는 동전의 최소 개수
//k가치를 만드는 경우의 수x, 사용된 동전의 개수
const dp = new Array(k + 1).fill(Infinity);
dp[0] = 0;

for (let coin of coins) {
  for (let j = coin; j <= k; j++) {
    dp[j] = Math.min(dp[j - coin] + 1, dp[j]);
  }
}

console.log(dp[k] === Infinity ? -1 : dp[k]);
