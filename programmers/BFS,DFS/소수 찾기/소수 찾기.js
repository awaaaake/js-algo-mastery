function solution(numbers) {
  const isPrimary = (num) => {
    if (num === 0 || num === 1) return false;
    for (let i = 2; i * i <= num; i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  const arr = numbers.split("");
  const n = arr.length;
  const used = Array(n).fill(false);
  const seen = new Set();

  const dfs = (path) => {
    if (path.length > 0) {
      seen.add(Number(path.join("")));
    }
    if (path.length === n) return;

    for (let i = 0; i < n; i++) {
      if (used[i]) continue;

      //백트래킹
      path.push(arr[i]);
      used[i] = true;
      dfs(path);
      path.pop(arr[i]);
      used[i] = false;
    }
  };

  dfs([]);
  let cnt = 0;
  for (let val of seen) if (isPrimary(val)) cnt += 1;
  return cnt;
}
