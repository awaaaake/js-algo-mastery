function solution(n, computers) {
  //dfs
  const graph = Array.from({ length: n }, () => []);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (computers[i][j] === 1 && i !== j) graph[i].push(j);
    }
  }

  let count = 0;
  const visited = new Array(n).fill(false);

  const dfs = (node) => {
    visited[node] = true;

    for (let next of graph[node]) {
      if (!visited[next]) {
        dfs(next);
      }
    }
  };

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      dfs(i);
      count++;
    }
  }

  return count;
}
