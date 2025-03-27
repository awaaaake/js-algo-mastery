const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [n, m, r] = input[0];
const counts = [0, ...input[1]];
const graph = Array.from({ length: n + 1 }, () => []);
for (let i = 2; i < input.length; i++) {
  const [a, b, l] = input[i];
  graph[a].push([b, l]);
  graph[b].push([a, l]);
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

      if (this.heap[idx][0] >= this.heap[parent][0]) break;

      [this.heap[parent], this.heap[idx]] = [this.heap[idx], this.heap[parent]];
      idx = parent;
    }
  }

  pop() {
    if (this.size() <= 1) return this.heap.pop();
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    let idx = 0;

    while (true) {
      let left = idx * 2 + 1;
      let right = idx * 2 + 2;
      let smallest = idx;
      if (left < this.size() && this.heap[left][0] < this.heap[idx][0]) {
        smallest = left;
      }
      if (right < this.size() && this.heap[right][0] < this.heap[idx][0]) {
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
  const distances = Array(n + 1).fill(Infinity);
  distances[start] = 0;

  const pq = new MinHeap();
  pq.push([0, start]); //start노드에서 특정노드까지의 거리, 특정 노드
  while (pq.size()) {
    const [currDist, currNode] = pq.pop();
    if (currDist > distances[currNode]) continue;

    for (const [nextNode, length] of graph[currNode]) {
      const newDist = currDist + length;
      if (newDist < distances[nextNode]) {
        distances[nextNode] = newDist;
        pq.push([newDist, nextNode]);
      }
    }
  }
  return distances;
};

let answer = 0;

for (let start = 1; start <= n; start++) {
  let result = 0;
  const distances = dijkstra(start);

  result = distances.reduce((acc, curr, i) => {
    if (curr <= m) return acc + counts[i];
    return acc;
  }, 0);
  answer = Math.max(answer, result);
}

console.log(answer);
