const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [N, K] = input[0];
const jewels = [];
const bags = [];
const data = input.slice(1, N + 1);

for (let i = 0; i < N; i++) {
  jewels.push(data[i]);
}
jewels.sort((a, b) => a[0] - b[0]); //O(NlogN)

for (let i = N + 1; i < input.length; i++) {
  bags.push(input[i][0]);
}
bags.sort((a, b) => a - b); //O(KlogK)

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);
    let idx = this.heap.length - 1;
    while (idx > 0) {
      let parent = Math.floor((idx - 1) / 2);
      if (this.heap[parent] >= this.heap[idx]) break;
      [this.heap[parent], this.heap[idx]] = [this.heap[idx], this.heap[parent]];
      idx = parent;
    }
  }

  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    let idx = 0;
    while (true) {
      let left = idx * 2 + 1;
      let right = idx * 2 + 2;
      let largest = idx;
      if (left < this.heap.length && this.heap[left] > this.heap[largest]) {
        largest = left;
      }

      if (right < this.heap.length && this.heap[right] > this.heap[largest]) {
        largest = right;
      }
      if (largest === idx) break; //더이상 이동x

      [this.heap[largest], this.heap[idx]] = [
        this.heap[idx],
        this.heap[largest],
      ];
      idx = largest;
    }
    return max;
  }
}

//1가방-1보석
let totalValue = 0;
let jewelIndex = 0; // 처리한 보석 인덱스
const maxHeap = new MaxHeap();

for (let i = 0; i < K; i++) {
  const bagCapacity = bags[i];

  //현재 가방에 담을 수 있는 보석들을 최대 힙에 추가 : 이전 가방에 담을 수 있었던 보석들 까지 포함됨(같은 하나의 힙)
  while (jewelIndex < N && jewels[jewelIndex][0] <= bagCapacity) {
    //O(NlogN)
    maxHeap.push(jewels[jewelIndex][1]);
    jewelIndex++;
  }

  const maxValue = maxHeap.pop(); //O(KlogN)
  //가방에 담을수있는 보석들 중에 가장 비싼것
  if (maxValue) {
    totalValue += maxValue;
  }
}
//O((N+K)logN + KlogK)
//N=300,000, 𝐾=300,000일 때 -> O((N+K)logN)
console.log(totalValue);
