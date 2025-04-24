function solution(routes) {
  routes.sort((a, b) => a[1] - b[1]);
  //매순간 최대한 끝으로 설정해야 다음 차량도..
  let count = 0;
  let prev = -30001;
  for (let [s, e] of routes) {
    if (s > prev) {
      count++;
      prev = e;
    }
  }
  return count;
}
