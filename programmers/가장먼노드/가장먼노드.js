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

      if (this.heap[parent][0] < this.heap[idx][0]) break;
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
      if (
        left < this.heap.length &&
        this.heap[left][0] < this.heap[smallest][0]
      ) {
        smallest = left;
      }
      if (
        right < this.heap.length &&
        this.heap[right][0] < this.heap[smallest][0]
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

function solution(n, edge) {
  const graph = Array.from({ length: n + 1 }, () => []);
  for (let [a, b] of edge) {
    graph[a].push(b);
    graph[b].push(a);
  }

  const pq = new MinHeap();
  const dijkstra = (start) => {
    const distances = new Array(n + 1).fill(Infinity);
    distances[start] = 0;
    pq.push([0, start]);

    while (pq.size()) {
      const [currDist, currNode] = pq.pop();

      if (distances[currNode] < currDist) continue;
      for (let nextNode of graph[currNode]) {
        const newDist = currDist + 1;
        if (distances[nextNode] > newDist) {
          distances[nextNode] = newDist;
          pq.push([newDist, nextNode]);
        }
      }
    }
    return distances;
  };
  const dist = dijkstra(1);
  const max = Math.max(...dist.slice(1));
  return dist.filter((el) => el === max).length;
}
