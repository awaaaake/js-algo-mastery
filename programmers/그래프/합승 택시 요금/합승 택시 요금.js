function solution(n, s, a, b, fares) {
  //특정 노드에서 다른노드로 가는 최단 경로(비용)
  const graph = Array.from({ length: n + 1 }, () => []);
  for (let [a, b, w] of fares) {
    graph[a].push([b, w]);
    graph[b].push([a, w]);
  }

  const dijkstra = (start) => {
    const distances = new Array(n + 1).fill(Infinity);
    distances[start] = 0;

    const queue = [[0, start]];

    while (queue.length) {
      const [dist, node] = queue.shift();

      if (distances[node] < dist) continue;

      for (let [next, weight] of graph[node]) {
        const newDist = dist + weight;
        if (newDist < distances[next]) {
          distances[next] = newDist;
          queue.push([newDist, next]);
        }
      }
    }

    return distances;
  };

  const distances = Array.from({ length: n + 1 }, () => []);
  for (let i = 1; i <= n; i++) {
    distances[i] = dijkstra(i);
  }

  //s -> ? -> a,b : 최적의 중간경로를 찾아야함
  let answer = Infinity;
  for (let stopped = 1; stopped <= n; stopped++) {
    let cost = distances[s][stopped];
    cost += distances[stopped][a] + distances[stopped][b];
    answer = Math.min(answer, cost);
  }
  return answer;
}
