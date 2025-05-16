const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const N = +input.shift();
const M = +input.shift();
const [S, E] = input.pop();
const graph = Array.from({ length: N + 1 }, () => []);
for (let [u, v, w] of input) {
  graph[u].push([v, w]);
}

class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  push(node) {
    this.heap.push(node);
    this._bubbleUp();
  }

  size() {
    return this.heap.length;
  }

  pop() {
    if (this.size() <= 1) return this.heap.pop();
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._bubbleDown();
    return top;
  }

  _bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      //while문이면 if (this.heap[parentIndex][0] <= this.heap[index][0]) break; -> break문을 거는게 좋음
      if (this.heap[parentIndex][0] > this.heap[index][0]) {
        //값비교는 거리를 기준으로 하되, 노드자체에는 [노드까지의 거리, 노도번호]
        [this.heap[parentIndex], this.heap[index]] = [
          this.heap[index],
          this.heap[parentIndex],
        ];
      }
      index = parentIndex;
    }
  }

  _bubbleDown() {
    let index = 0;

    while (true) {
      const left = index * 2 + 1;
      const right = index * 2 + 2;
      let smallest = index;

      if (left < this.size() && this.heap[left][0] < this.heap[smallest][0])
        smallest = left;
      if (right < this.size() && this.heap[right][0] < this.heap[smallest][0])
        smallest = right;
      if (smallest === index) break; //자신그대로면 중단

      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ]; //두자식중 하나(이상)라도 자신보다 더작다면

      index = smallest;
    }
  }
}

const dijkstra = (start) => {
  const distances = new Array(N + 1).fill(Infinity); //start노드부터 모든 노드까지의 거리를 무한대로 초기화
  distances[start] = 0;
  const pq = new PriorityQueue();

  pq.push([0, start]); //특정노드까지의 거리, 특정노드
  while (pq.size() > 0) {
    const [currDist, currNode] = pq.pop();

    if (currDist > distances[currNode]) continue;

    for (let [nextNode, weight] of graph[currNode]) {
      const newDist = currDist + weight;
      if (newDist < distances[nextNode]) {
        distances[nextNode] = newDist;
        pq.push([newDist, nextNode]);
      }
    }
  }
  return distances;
};
const distances = dijkstra(S);
console.log(distances[E]);
