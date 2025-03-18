const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [N, K] = input[0];
const jewels = [];
for (let i = 1; i < N + 1; i++) {
  jewels.push({ weight: input[i][0], value: input[i][1] });
}
jewels.sort((a, b) => a.weight - b.weight);

const bags = [];
for (let i = N + 1; i < input.length; i++) {
  bags.push(input[i][0]);
}
bags.sort((a, b) => a - b);

let totalValue = 0;
let jewelIndex = 0;

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);
    let idx = this.heap.length - 1;

while (idx > 0) {//0이상이 아니라 0보다 클때까지 -> 인덱스가 0일 때 parent는 -1 -> 잘못된 인덱스 접근으로 에러 발생가능!
      //idx가 0이상 x, 0보다 커야함
      let parent = Math.floor((idx - 1) / 2);
      if (this.heap[parent] >= this.heap[idx]) break;

      [this.heap[parent], this.heap[idx]] = [this.heap[idx], this.heap[parent]];
      idx = parent;
    }
  }

  pop() {
    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    let idx = 0;

    let left = idx * 2 + 1;
    let right = idx * 2 + 2;
    let largest = idx;

    while (true) {
      if (this.heap[left] > this.heap[largest]) {
        largest = left;
      }

      if (this.heap[right] > this.heap[largest]) {
        largest = right;
      }

      if (idx === largest) break;

      [this.heap[largest], this.heap[idx]] = [
        this.heap[idx],
        this.heap[largest],
      ];
      idx = largest;
    }
    return max;
  }
}

const maxheap = new MaxHeap();

for (let i = 0; i < K; i++) {
  const currC = bags[i];

  while (jewelIndex < N && jewels[jewelIndex].weight <= currC) {
    maxheap.push(jewels[jewelIndex].value);
    jewelIndex++;
  }
  console.log(maxheap);

  const maxValue = maxheap.pop();
  if (maxValue) {
    totalValue += maxValue;
  }
}

console.log(totalValue);
