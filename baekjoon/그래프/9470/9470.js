const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [T] = input[0];
let t = 0;
let i = 1;
while (t < T) {
  const [K, M, P] = input[i++];
  const inDegree = new Array(M + 1).fill(0);
  const graph = Array.from({ length: M + 1 }, () => []);
  let order = Array.from({ length: M + 1 }, () => [0, 0]); //max, cnt(최대값, 동률 개수)

  for (let [a, b] of input.slice(i, i + P)) {
    graph[a].push(b);
    inDegree[b]++;
  }

  const queue = [];

  for (let i = 1; i <= M; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
      order[i] = [1, 0];
    }
  }

  while (queue.length) {
    const node = queue.shift();

    for (let next of graph[node]) {
      inDegree[next]--;

      const currOrder = order[node][0];

      if (order[next][0] === currOrder) {
        order[next][1] += 1;
      } else if (order[next][0] < currOrder) {
        order[next] = [currOrder, 1];
      }

      if (inDegree[next] === 0) {
        //노드 순서를 확정지어야함
        if (order[next][1] > 1) order[next][0] += 1;
        queue.push(next);
      }
    }
  }

  let ans = 0;
  for (let node = 1; node <= M; node++) {
    if (order[node][0] > ans) ans = order[node][0];
  }

  console.log(K, ans);
  i += P;
  t++;
}
