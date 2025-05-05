function solution(n, results) {
  const graph = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));

  for (let [a, b] of results) {
    graph[a][b] = 1;
    graph[b][a] = -1;
  }

  //폴로이드-워셜 알고리즘 : 간접적인 승패 관계를 모두 파악함
  for (let k = 1; k <= n; k++) {
    //i가 k를 이기고, k가 j를 이기면 i는 j를 이김
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        if (graph[i][k] === 1 && graph[k][j] === 1) {
          graph[i][j] = 1;
          graph[j][i] = -1;
        }

        if (graph[i][k] === -1 && graph[k][j] === -1) {
          graph[i][j] = -1;
          graph[j][i] = 1;
        }
      }
    }
  }

  //순위를 알 수 있는 선수: 자기 제외 n-1명의 승패가 모두 정해진 경우
  let answer = 0;
  for (let i = 1; i <= n; i++) {
    const cnt = graph[i].reduce((acc, curr) => (curr !== 0 ? acc + 1 : acc), 0);
    if (cnt === n - 1) answer++;
  }
  return answer;
}
