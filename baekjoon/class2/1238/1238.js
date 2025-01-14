const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/class2/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [[N, M, X], ...edgeInfo] = input;
const graph = Array.from({ length: N + 1 }, () => []);
for (let [u, v, w] of edgeInfo) {
  graph[u].push([v, w]); //그래프를 인접리스트로 초기화
}

// 우선순위 큐 구현
class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  push(node) {
    this.heap.push(node);
    this._bubbleUp();
  }

  pop() {
    if (this.size() <= 1) return this.heap.pop();
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._bubbleDown();
    return top;
  }

  size() {
    return this.heap.length;
  }

  _bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index][0] >= this.heap[parentIndex][0]) break;
      [this.heap[index], this.heap[parentIndex]] = [
        this.heap[parentIndex],
        this.heap[index],
      ];
      index = parentIndex;
    }
  }

  _bubbleDown() {
    let index = 0;
    const length = this.heap.length;
    while (true) {
      const left = 2 * index + 1;
      const right = 2 * index + 2;
      let smallest = index;

      if (left < length && this.heap[left][0] < this.heap[smallest][0])
        smallest = left;
      if (right < length && this.heap[right][0] < this.heap[smallest][0])
        smallest = right;
      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      index = smallest;
    }
  }
}

const dijkstra = (start) => {
  const distances = Array(N + 1).fill(Infinity);
  distances[start] = 0; //start에서 start노드로 가는 경로 0으로초기화

  const pq = new PriorityQueue();

  pq.push([0, start]); //특정노드까지의 거리
  if (start === X) console.log(pq);

  while (pq.size() > 0) {
    const [currDist, currNode] = pq.pop();

    if (currDist > distances[currNode]) continue;

    for (const [nextNode, weight] of graph[currNode]) {
      const newDist = currDist + weight;
      if (newDist < distances[nextNode]) {
        distances[nextNode] = newDist;
        distances[nextNode] = newDist;
        pq.push([newDist, nextNode]);
      }
    }
  }
  return distances;
};
const answer = new Array(N + 1).fill(0);

const distancesBack = dijkstra(X);

for (let i = 1; i <= N; i++) {
  if (i === X) continue;
  const distancesGo = dijkstra(i);
  answer[i] = distancesGo[X] + distancesBack[i];
}
console.log(Math.max(...answer));
