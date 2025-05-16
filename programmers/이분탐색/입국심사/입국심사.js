function solution(n, times) {
  let left = 1;
  let right = Math.max(...times) * n;
  let answer = 0;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    const total = times.reduce((acc, time) => acc + Math.floor(mid / time), 0);

    if (total >= n) {
      right = mid - 1;
      answer = mid;
    } else {
      left = mid + 1;
    }
  }
  return answer;
}
