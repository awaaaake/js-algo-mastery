function solution(triangle) {
  const n = triangle.length;
  let dp = triangle[0];
  for (let i = 1; i < n; i++) {
    const newRow = triangle[i];
    let temp = [...dp];
    dp = [];
    const k = triangle[i].length;
    for (let j = 0; j < k; j++) {
      if (j === 0) {
        dp[j] = temp[j] + newRow[j];
      } else if (j === k - 1) {
        dp[j] = temp[j - 1] + newRow[j];
      } else {
        dp[j] = Math.max(temp[j - 1], temp[j]) + newRow[j];
      }
    }
  }
  return Math.max(...dp);
}
