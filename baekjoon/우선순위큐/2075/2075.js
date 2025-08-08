const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [N] = input[0];
const arr = input.slice(1);

class MinHeap {
  constructor() {
    this.heap = []; //사이즈의 최솟값을 반환하는 최소힙
  }

  size() {
    return this.heap.length;
  }

  push(val) {
    this.heap.push(val);
    let idx = this.size() - 1;

    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);

      if (this.heap[parentIdx] <= this.heap[idx]) break;
      [this.heap[parentIdx], this.heap[idx]] = [
        this.heap[idx],
        this.heap[parentIdx],
      ];

      idx = parentIdx;
    }
  }

  pop() {
    const top = this.heap[0];
    const end = this.heap.pop();

    if (!this.size()) return top;
    this.heap[0] = end;

    let idx = 0;

    while (true) {
      let left = idx * 2 + 1;
      let right = idx * 2 + 2;
      let smallest = idx;

      if (left < this.size() && this.heap[left] < this.heap[smallest]) {
        smallest = left;
      }

      if (right < this.size() && this.heap[right] < this.heap[smallest]) {
        smallest = right;
      }

      if (smallest === idx) break;
      [this.heap[smallest], this.heap[idx]] = [
        this.heap[idx],
        this.heap[smallest],
      ];

      idx = smallest;
    }
    return top;
  }

  peek() {
    return this.heap[0];
  }
}

const heap = new MinHeap();

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    //기존 힙 원소들보다 큰수만 계속 집어넣어서 상위의 5개 수만 남게 만든다.
    //가장 상위의 5개 수를 힙에 저장하고, 그중에서 가장 작은값 = N번째로 큰값
    if (heap.size() < N) {
      heap.push(arr[i][j]);
    } else if (arr[i][j] > heap.peek()) {
      heap.pop();
      heap.push(arr[i][j]);
    }
  }
}

console.log(heap.peek());
