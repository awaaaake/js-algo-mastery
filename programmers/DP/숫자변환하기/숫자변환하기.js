function solution(x, y, n) {
  const dp = new Array(1000001).fill(Infinity); //dp[i]:x에서 i가 되기위한 최소연산 횟수
  dp[x] = 0;
  for (let i = x; i <= y; i++) {
    dp[i * 2] = Math.min(dp[i * 2], dp[i] + 1);
    dp[i * 3] = Math.min(dp[i * 3], dp[i] + 1);
    dp[i + n] = Math.min(dp[i + n], dp[i] + 1);
  }
  return dp[y] === Infinity ? -1 : dp[y];
}
