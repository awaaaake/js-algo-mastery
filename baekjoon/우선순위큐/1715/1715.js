const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const N = input[0];
const sizes = input.slice(1);
sizes.sort((a, b) => a - b);

//매번 작은 두묶음을 합쳐야함
//두묶음을 합친 사이즈도 sizes 배열에 추가
class MinHeap {
  constructor(initial) {
    this.heap = initial; //사이즈의 최솟값을 반환하는 최소힙
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
}

const pq = new MinHeap(sizes);

let cnt = 0;

while (pq.size() > 1) {
  const a = pq.pop();
  const b = pq.pop();
  cnt += a + b;

  pq.push(a + b);
}

console.log(cnt);
