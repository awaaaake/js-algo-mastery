function solution(alp, cop, problems) {
  let maxAlp = Math.max(...problems.map((pb) => pb[0]));
  let maxCop = Math.max(...problems.map((pb) => pb[1]));

  if (alp > maxAlp) alp = maxAlp;
  if (cop > maxCop) cop = maxCop;

  const dp = Array.from(new Array(151), () => new Array(151).fill(Infinity));
  dp[alp][cop] = 0;

  for (let i = alp; i <= maxAlp; i++) {
    for (let j = cop; j <= maxCop; j++) {
      if (i < maxAlp) dp[i + 1][j] = Math.min(dp[i + 1][j], dp[i][j] + 1);
      if (j < maxCop) dp[i][j + 1] = Math.min(dp[i][j + 1], dp[i][j] + 1);

      for (let k = 0; k < problems.length; k++) {
        const [alpReq, copReq, alpRwd, copRwd, cost] = problems[k];

        if (i >= alpReq && j >= copReq) {
          const tempAlp = i + alpRwd;
          const tempCop = j + copRwd;
          if (tempAlp >= maxAlp && tempCop >= maxCop) {
            dp[maxAlp][maxCop] = Math.min(dp[maxAlp][maxCop], dp[i][j] + cost);
          } else if (tempCop >= maxCop) {
            dp[tempAlp][maxCop] = Math.min(
              dp[tempAlp][maxCop],
              dp[i][j] + cost
            );
          } else if (tempAlp >= maxAlp) {
            dp[maxAlp][tempCop] = Math.min(
              dp[maxAlp][tempCop],
              dp[i][j] + cost
            );
          } else {
            dp[tempAlp][tempCop] = Math.min(
              dp[tempAlp][tempCop],
              dp[i][j] + cost
            );
          }
        }
      }
    }
  }
  return dp[maxAlp][maxCop];
}

solution(10, 10, [
  [10, 15, 2, 1, 2],
  [20, 20, 3, 3, 4],
]);
