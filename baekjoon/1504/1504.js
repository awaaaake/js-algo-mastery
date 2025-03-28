const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [N, E] = input.shift();
const [v1, v2] = input.pop();
const graph = Array.from({ length: N + 1 }, () => []);
for (let [a, b, c] of input) {
  graph[a].push([b, c]);
  graph[b].push([a, c]);
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  push(node) {
    this.heap.push(node);
    let idx = this.size() - 1;
    while (idx > 0) {
      const parent = Math.floor((idx - 1) / 2);
      if (this.heap[parent][0] < this.heap[idx][0]) break;
      [this.heap[parent], this.heap[idx]] = [this.heap[idx], this.heap[parent]];
      idx = parent;
    }
  }

  pop() {
    const min = this.heap[0];
    if (this.size() <= 1) return this.heap.pop(); //힙의 크기가 1이하면 바로 반환
    this.heap[0] = this.heap.pop();

    let idx = 0;
    while (true) {
      let left = idx * 2 + 1;
      let right = idx * 2 + 2;
      let smallest = idx;
      if (left < this.size() && this.heap[left] < this.heap[smallest][0]) {
        smallest = left;
      }

      if (right < this.size() && this.heap[right] < this.heap[smallest][0]) {
        smallest = right;
      }

      if (smallest === idx) break;
      [this.heap[idx], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[idx],
      ];
      idx = smallest;
    }
    return min;
  }
}

const dijkstra = (start) => {
  const distances = new Array(N + 1).fill(Infinity);

  distances[start] = 0;
  const pq = new MinHeap();
  pq.push([0, start]);
  while (pq.size()) {
    const [currDist, currNode] = pq.pop();

    if (currDist > distances[currNode]) continue;

    for (const [nextNode, weight] of graph[currNode]) {
      const newDist = currDist + weight;
      if (newDist < distances[nextNode]) {
        distances[nextNode] = newDist;
        pq.push([newDist, nextNode]);
      }
    }
  }
  return distances;
};
function solve() {
  let answer = 0;
  const dist = dijkstra(1);
  const dist2 = dijkstra(v1);
  const dist3 = dijkstra(v2);
  answer = Math.min(
    dist[v1] + dist2[v2] + dist3[N],
    dist[v2] + dist3[v1] + dist2[N]
  );
  if (answer === Infinity) return -1;
  return answer;
}
console.log(solve());
