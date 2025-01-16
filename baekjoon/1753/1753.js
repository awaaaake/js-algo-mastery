const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/class2/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [[V, E], [start], ...edgeInfo] = input;
const graph = Array.from({ length: V + 1 }, () => []);
for (let [u, v, w] of edgeInfo) {
  //각 정점의 인접한 정점과 가중치를 저장
  graph[u].push([v, w]);
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
  //시작정점에서 다른 모든 정점까지의 최단 경로를 계산
  const distances = Array(V + 1).fill(Infinity);
  distances[start] = 0;

  const pq = new PriorityQueue(); // Min-Heap

  pq.push([0, start]); //시작노드에서 특정 노드까지의 거리 [distance, node]
  while (pq.size() > 0) {
    //최소 거리 노드 추출
    const [currDist, currNode] = pq.pop();

    //이미 처리된 경우 스킵
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

const distances = dijkstra(start);

for (let i = 1; i <= V; i++) {
  console.log(distances[i] === Infinity ? "INF" : distances[i]);
}
