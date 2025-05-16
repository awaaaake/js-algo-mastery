const fs = require("fs");
const input = fs.readFileSync("/dev/stdin", "utf8").trim().split("\n");
const N = +input[0];
const problems = input.slice(1).map((line) => line.split(" ").map(Number));

// 데드라인 기준 내림차순 정렬
problems.sort((a, b) => b[0] - a[0]);

// 최대 데드라인 구하기
let maxDay = problems[0][0];

// MaxHeap 구현
class MaxHeap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);
    let i = this.heap.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.heap[parent] >= this.heap[i]) break;
      [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
      i = parent;
    }
  }

  pop() {
    if (this.heap.length === 1) return this.heap.pop();
    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    let i = 0;
    while (true) {
      let left = 2 * i + 1;
      let right = 2 * i + 2;
      let largest = i;

      if (left < this.heap.length && this.heap[left] > this.heap[largest])
        largest = left;
      if (right < this.heap.length && this.heap[right] > this.heap[largest])
        largest = right;

      if (largest === i) break;
      [this.heap[i], this.heap[largest]] = [this.heap[largest], this.heap[i]];
      i = largest;
    }
    return max;
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

const heap = new MaxHeap();
let answer = 0;
let idx = 0;

// 날짜를 거꾸로 돌면서 (maxDay → 1)
for (let day = maxDay; day >= 1; day--) {
  // 오늘 날짜 이상인 문제들을 heap에 추가
  while (idx < N && problems[idx][0] >= day) {
    heap.push(problems[idx][1]); // 컵라면 수
    idx++;
  }

  // 가장 컵라면 많은 문제 하나 선택
  if (!heap.isEmpty()) {
    answer += heap.pop();
  }
}

console.log(answer);

//minheap 코드
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin", "utf8").trim().split("\n");
// const N = +input[0];
// const problems = input.slice(1).map((line) => line.split(" ").map(Number));

// // 데드라인 기준으로 정렬
// problems.sort((a, b) => a[0] - b[0]);

// // MinHeap 구현 (컵라면 수가 적은 것부터 제거)
// const minHeap = [];

// function push(heap, value) {
//   heap.push(value);
//   let i = heap.length - 1;
//   while (i > 0) {
//     const parent = Math.floor((i - 1) / 2);
//     if (heap[parent] <= heap[i]) break;
//     [heap[parent], heap[i]] = [heap[i], heap[parent]];
//     i = parent;
//   }
// }

// function pop(heap) {
//   const result = heap[0];
//   const end = heap.pop();
//   if (heap.length === 0) return result;

//   heap[0] = end;
//   let i = 0;
//   while (true) {
//     let left = 2 * i + 1;
//     let right = 2 * i + 2;
//     let smallest = i;

//     if (left < heap.length && heap[left] < heap[smallest]) smallest = left;
//     if (right < heap.length && heap[right] < heap[smallest]) smallest = right;

//     if (smallest === i) break;
//     [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
//     i = smallest;
//   }

//   return result;
// }

// for (let i = 0; i < N; i++) {
//   const [deadline, cup] = problems[i];
//   push(minHeap, cup);

//   if (minHeap.length > deadline) {
//     pop(minHeap); // 가장 적은 컵라면 수 제거
//   }
// }

// const answer = minHeap.reduce((acc, cur) => acc + cur, 0);
// console.log(answer);
