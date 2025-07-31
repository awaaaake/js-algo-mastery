const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [N] = input[0];
const uses = input.slice(1);

uses.sort((a, b) => a[0] - b[0]); //시작 시간 기준 정렬

class MinHeap {
  constructor() {
    this.heap = [];
  }

  peek() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }

  push(val) {
    this.heap.push(val);
    let idx = this.heap.length - 1;
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const curr = this.heap[idx];
      const parent = this.heap[parentIdx];

      if (curr[0] >= parent[0]) break; //부모의 종료시간이 더 빠르면 종료
      [this.heap[idx], this.heap[parentIdx]] = [
        this.heap[parentIdx],
        this.heap[idx],
      ];

      idx = parentIdx;
    }
  }

  pop() {
    if (this.size() === 0) return null;
    if (this.size() === 1) return this.heap.pop();
    //heap 사이즈가 1일 때, this.heap은 비어있는데 pop한 것을 할당하면, this.heap[0]= undefined로 끝난다.
    const top = this.heap[0];
    this.heap[0] = this.heap.pop(); //// 배열이 비어있는데 [0] 위치에 undefined 저장 → this.heap = [undefined]
    //빈 배열을 인덱싱해서 대입하려고 하면 undefined가 됨
    let idx = 0;
    while (true) {
      let leftIdx = idx * 2 + 1;
      let rightIdx = idx * 2 + 2;
      let smallest = idx;

      if (
        leftIdx < this.heap.length &&
        this.heap[leftIdx][0] < this.heap[smallest][0]
      ) {
        smallest = leftIdx;
      }

      if (
        rightIdx < this.heap.length &&
        this.heap[rightIdx][0] < this.heap[smallest][0]
      ) {
        smallest = rightIdx;
      }

      if (smallest === idx) break;
      [this.heap[idx], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[idx],
      ];
      idx = smallest;
    }
    return top;
  }
}
const pq = new MinHeap(); //종료 시간 기준 정렬, 최소힙
const available = new MinHeap(); //사용 가능한 자리 번호
const cnt = [];

let seatCount = 0; //할당된 컴퓨터 자리 수

for (const [start, end] of uses) {
  while (pq.size() && pq.peek()[0] <= start) {
    //[우선순위 큐] 현재 사용자의 끝나는 시간 <= 다음 사용자의 시작 시간
    const [_, seatNum] = pq.pop(); //큐는 항상 종료시간 기준으로 정렬되어야 함
    available.push([seatNum]);
  }

  //자리 할당
  let seatNum;
  if (available.size() > 0) {
    //번호가 가장 작은 자리 선택
    [seatNum] = available.pop();
  } else {
    seatNum = seatCount++;
    cnt[seatNum] = 0;
  }
  cnt[seatNum]++;
  pq.push([end, seatNum]);
}

console.log(seatCount);
console.log(cnt.slice(0, seatCount).join(" "));