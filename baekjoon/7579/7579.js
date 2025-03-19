const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [N, M] = input[0];
const memory = input[1];
const cost = input[2];
const sumC = cost.reduce((pre, curr) => pre + curr); //모든 앱을 비활성화 했을 때 최대 비용
const dp = new Array(sumC + 1).fill(0);
//dp[cost] : 비용이 cost일 때 확보할 수 있는 최대 메모리 양

for (let i = 0; i < N; i++) {
  for (let j = sumC; j >= cost[i]; j--) {
    dp[j] = Math.max(dp[j], dp[j - cost[i]] + memory[i]); //현재앱을 비활성화하는경우: 비활성화하기전 비용에서 확보가능한 최대 용량 + 현재 앱을 비활성화함으로써얻는 용량
  }
}

for(let c=0; c<=sumC; c++) {
    if(dp[c]>=M) {
        console.log(c);
        return;
    }
}
