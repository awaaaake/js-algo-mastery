const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [N] = input.shift();
const dp = Array.from({ length: 3 }, () => [0, 0]); //dp[j] j번째 열로 내려왔을 때 [최대 점수, 최소 점수]

//첫 행 초기화
for (let j = 0; j < 3; j++) {
  dp[j] = [input[0][j], input[0][j]];
}

for (let i = 1; i < N; i++) {
  const tempMax = [...dp.map((el) => el[0])]; //직전행의 최대값들
  const tempMin = [...dp.map((el) => el[1])]; //직전행의 최소값들

  // 각 행의 최대값 계산
  dp[0][0] = Math.max(tempMax[0], tempMax[1]) + input[i][0];
  dp[1][0] = Math.max(tempMax[0], tempMax[1], tempMax[2]) + input[i][1];
  dp[2][0] = Math.max(tempMax[1], tempMax[2]) + input[i][2];

  // 각 행의 최소값 계산
  dp[0][1] = Math.min(tempMin[0], tempMin[1]) + input[i][0];
  dp[1][1] = Math.min(tempMin[0], tempMin[1], tempMin[2]) + input[i][1];
  dp[2][1] = Math.min(tempMin[1], tempMin[2]) + input[i][2];
}

console.log(Math.max(...dp.flat()), Math.min(...dp.flat()));
