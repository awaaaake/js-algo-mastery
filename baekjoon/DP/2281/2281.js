const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input[0].split(" ").map(Number);
const nameLens = input.slice(1).map(Number);

//각 줄의 끝에 사용하지 않고 남게 되는 칸의 수의 제곱의 합이 최소
//마지막 줄은 계산에서 제외
const prefixSum = new Array(n + 1).fill(0);
for (let i = 1; i <= n; i++) {
  prefixSum[i] = prefixSum[i - 1] + nameLens[i - 1];
}

const dp = new Array(n + 1).fill(Infinity); //1~i번이름까지 배치하는 최소비용
dp[0] = 0;
for (let i = 1; i <= n; i++) {
  for (let j = 0; j < i; j++) {
    //j에따라서 한줄에 배치할 이름의 개수가 달라진다.
    //j+1부터 i까지는 한줄에 배치한다고 가정
    const totallen = prefixSum[i] - prefixSum[j] + (i - j - 1);
    if (totallen > m) continue; //i+1~j까지 너무 많아서 한줄에 배치가 불가능
    const cost = i === n ? 0 : (m - totallen) ** 2; //i가 n이라면 마지막줄을 추가하는것이므로 비용x
    dp[i] = Math.min(dp[i], dp[j] + cost);
  }
}

console.log(dp[n]);
