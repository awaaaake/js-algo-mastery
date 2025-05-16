class MinHeap {
  //정렬 기준이 3개
  constructor(compare) {
    this.heap = [];
    this.compare = compare;
  }

  size() {
    return this.heap.length;
  }

  push(task) {
    this.heap.push(task);
    let idx = this.heap.length - 1;

    while (idx > 0) {
      let parent = Math.floor((idx - 1) / 2);

      if (this.compare(this.heap[parent], this.heap[idx]) <= 0) {
        //부모가 정렬기준상 앞 쪽이면
        break;
      }

      [this.heap[parent], this.heap[idx]] = [this.heap[idx], this.heap[parent]];
      idx = parent;
    }
  }

  pop() {
    if (this.heap.length <= 1) return this.heap.pop();
    let idx = 0;
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();

    while (true) {
      let left = idx * 2 + 1;
      let right = idx * 2 + 2;
      let smallest = idx;

      if (
        left < this.heap.length &&
        this.compare(this.heap[left], this.heap[smallest]) < 0
      ) {
        smallest = left;
      }

      if (
        right < this.heap.length &&
        this.compare(this.heap[right], this.heap[smallest]) < 0
      ) {
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

function solution(jobs) {
  const n = jobs.length;

  const compare = (a, b) => {
    //오름 차순 정렬 기준, a가 b보다 작을 때 음수 반환
    if (a.total === b.total) {
      if (a.s === b.s) {
        return a.num - b.num;
      }
      return a.s - b.s;
    }
    return a.total - b.total;
  };

  //작업의 소요 시간↓, 작업의 요청 시각 빠른것, 작업의 번호↓
  let totalReturnTime = 0;
  let currTime = 0;
  const pq = new MinHeap(compare);

  jobs = jobs.map((task, idx) => {
    return { num: idx, s: task[0], total: task[1] };
  });
  jobs.sort((a, b) => a.s - b.s); //jobs는 요청 시각 순으로 정렬돼 있다는 전제X

  let i = 0; //요청 시작 순서대로 순회하는 인덱스

  while (i < jobs.length || pq.size()) {
    while (i < jobs.length && jobs[i].s <= currTime) {
      //currTime: prevTask가 끝나는 시점
      pq.push(jobs[i++]);
    }

    if (pq.size()) {
      const prevTask = pq.pop();
      currTime += prevTask.total;
      totalReturnTime += currTime - prevTask.s;
    } else {
      currTime = jobs[i].s;
    }
  }

  return Math.floor(totalReturnTime / n);
}
