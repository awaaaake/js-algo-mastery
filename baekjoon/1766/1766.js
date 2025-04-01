const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [N, M] = input.shift();
const inDegree = new Array(N + 1).fill(0);
const first = {};
for (let [a, b] of input) {
  inDegree[b]++;
  if (first[a]) first[a].push(b);
  else first[a] = [b];
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  push(value) {
    this.heap.push(value);
    let idx = this.heap.length - 1;
    while (idx > 0) {
      let parent = Math.floor((idx - 1) / 2);
      if (this.heap[parent] < this.heap[idx]) break;
      [this.heap[parent], this.heap[idx]] = [this.heap[idx], this.heap[parent]];
      idx = parent;
    }
  }

  pop() {
    const min = this.heap[0];
    if (this.heap.length <= 1) return this.heap.shift();
    this.heap[0] = this.heap.pop();
    let idx = 0;
    while (true) {
      let left = idx * 2 + 1;
      let right = idx * 2 + 2;
      let smallest = idx;
      if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
        smallest = left;
      }
      if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
        smallest = right;
      }
      if (smallest === idx) break;
      [this.heap[smallest], this.heap[idx]] = [
        this.heap[idx],
        this.heap[smallest],
      ];
      idx = smallest;
    }
    return min;
  }
}

const queue = new MinHeap();
for (let i = 1; i <= N; i++) {
  if (inDegree[i] === 0) {
    queue.push(i);
  }
}

const result = [];
while (queue.size()) {
  const curr = queue.pop();
  result.push(curr);
  if (first[curr]) {
    for (let next of first[curr]) {
      inDegree[next]--;
      if (inDegree[next] === 0) {
        queue.push(next);
      }
    }
  }
}
console.log(result.join(" "));
