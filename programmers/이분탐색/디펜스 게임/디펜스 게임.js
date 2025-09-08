class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  pop() {
    if (this.size() <= 1) return this.heap.pop();
    let idx = 0;
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();

    while (true) {
      let left = idx * 2 + 1;
      let right = idx * 2 + 2;
      let smallest = idx;

      if (this.heap[left] < this.heap[smallest]) smallest = left;
      if (this.heap[right] < this.heap[smallest]) smallest = right;
      if (smallest === idx) break;

      [this.heap[smallest], this.heap[idx]] = [
        this.heap[idx],
        this.heap[smallest],
      ];
      idx = smallest;
    }
    return min;
  }

  push(value) {
    this.heap.push(value);
    let idx = this.heap.length - 1;
    while (idx > 0) {
      let parent = Math.floor((idx - 1) / 2);

      if (this.heap[parent] <= this.heap[idx]) break;
      [this.heap[parent], this.heap[idx]] = [this.heap[idx], this.heap[parent]];
      idx = parent;
    }
  }
}

function solution(n, k, enemy) {
  //최대한 많은 라운드를 진행
  //무적권 최대 k번
  const heap = new MinHeap();
  let remain = n;

  for (let i = 0; i < enemy.length; i++) {
    const cnt = enemy[i];
    heap.push(cnt);

    if (heap.size() > k) {
      remain -= heap.pop();

      if (remain < 0) return i;
    }
  }

  return enemy.length; //enmey를 전부 막음
}
