class MinHeap {
  constructor() {
    this.heap = [];
  }

  isSuccess(K) {
    //minheap이기때문에 root가 k이상인지만 확인하면됨
    return this.heap[0] >= K;
  }

  size() {
    return this.heap.length;
  }

  push(val) {
    this.heap.push(val);
    let idx = this.heap.length - 1;
    while (idx > 0) {
      let parent = Math.floor((idx - 1) / 2);
      if (this.heap[parent] <= this.heap[idx]) break;

      [this.heap[parent], this.heap[idx]] = [this.heap[idx], this.heap[parent]];
      idx = parent;
    }
  }

  pop() {
    if (this.heap.length <= 1) return this.heap.pop();
    const min = this.heap[0];
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

      if (smallest === idx) {
        break;
      }
      [this.heap[idx], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[idx],
      ];
      idx = smallest;
    }
    return min;
  }
}

function solution(scoville, K) {
  let count = 0;
  const minheap = new MinHeap();

  for (let val of scoville) {
    minheap.push(val);
  }

  while (true) {
    if (minheap.isSuccess(K)) break;
    if (minheap.size() <= 1) {
      count = -1;
      break;
    }
    const first = minheap.pop();
    const second = minheap.pop();

    let mix = first + second * 2;
    minheap.push(mix);
    count++;
  }

  return count;
}
