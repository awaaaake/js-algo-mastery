const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");

const [n, k] = input[0].split(" ").map(Number);
const coins = input.slice(1, 1 + n).map(Number);
//k가치를 만드는 경우의 수
//순서가 다른것은 같은 경우로 취급 -> 조합
const dp = new Array(k + 1).fill(0); //dp[i] : i의 가치를 만드는 경우의 수

dp[0] = 1; //아무것도 안쓰기

for (let coin of coins) {
  for (let j = coin; j <= k; j++) {
    dp[j] += dp[j - coin];
  }
}

console.log(dp[k]);
