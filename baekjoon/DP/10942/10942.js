const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [N] = input[0];
const nums = input[1];
const M = input[2];

const dp = Array.from({ length: N }, () => new Array(N).fill(0)); //dp[i][j] : i+1번째 수부터 j+1번째 수까지가 팰린드롬인지 여부

for (let i = N - 1; i >= 0; i--) {
  for (let j = i; j < N; j++) {
    if (i === j) dp[i][j] = 1; //한자리 수 이거나
    else {
      if ((dp[i + 1][j - 1] || j - i === 1) && nums[i] === nums[j]) {
        //두자리수 인데 두 수가 같거나, 3자리이상의 수이면 양끝두 수가 같으면서 i+1부터 j-1까지가 팰린드롬인지 확인하면 됨
        dp[i][j] = 1;
      }
    }
  }
}

const answer = [];
for (let i = 3; i < input.length; i++) {
  const [s, e] = input[i];
  answer.push(dp[s - 1][e - 1]);
}

console.log(answer.join("\n"));
