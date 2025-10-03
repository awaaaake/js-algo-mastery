const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [n] = input[0];
const arr = input[1];
arr.unshift(arr[0]);

if (n === 1) {
  //음이 하나면, 힘든정도가 0
  console.log(0);
  return;
}

const dp = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(Infinity));
//dp[i][j] : a가 i를 마지막 음으로 불렀을 때, b가 j를 마지막 음으로 불렀을 때 힘든 정도의 최솟값

dp[0][1] = 0; //아무도 부르지 않은 상태

for (let j = 1; j < n; j++) {
  const k = j + 1; //다음에 배정할 음

  for (let i = 0; i < j; i++) {
    const cur = dp[i][j];
    if (cur === Infinity) continue;

    //j를 부른 사람이 k도 부르는 경우(연속) = 다음 음(가장 최근 음)을 부를 사람이 j, 다른 사람이 마지막으로 부른음이 i
    const costSame = cur + Math.abs(arr[k] - arr[j]);
    dp[i][k] = Math.min(dp[i][k], costSame);

    //i를 부른 사람이 k를 부르는 경우(교대) = 다음 음(가장 최근 음)을 부를 사람이 i, 다른 사람이 마지막으로 부른음이 j
    const costAlt = cur + (i === 0 ? 0 : Math.abs(arr[k] - arr[i]));
    dp[j][k] = Math.min(dp[j][k], costAlt);
  }
}

let ans = Infinity;
for (let i = 0; i < n; i++) ans = Math.min(ans, dp[i][n]);
console.log(ans);
