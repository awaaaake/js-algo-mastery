const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

//최소비용으로, 사이클x 모든 정점을 연결하는 알고리즘
let i = 0;

while (i < input.length) {
  const [m, n] = input[i++];
  if (m === 0 && n === 0) break;

  const edges = input.slice(i, i + n);
  const parent = new Array(m + 1).fill().map((_, i) => i);
  const totalCost = edges.reduce((acc, cur) => acc + cur[2], 0);
  edges.sort((a, b) => a[2] - b[2]); //비용이 적은 순으로 정렬

  let cost = 0;
  let cnt = 0;

  function find(x) {
    //root를 찾는 함수
    if (x === parent[x]) return x;
    return (parent[x] = find(parent[x]));
  }

  function union(a, b) {
    const rootA = find(a);
    const rootB = find(b);
    if (rootA !== rootB) {
      a < b ? (parent[rootB] = rootA) : (parent[rootA] = rootB);
    }
  }

  for (let j = 0; j < n; j++) {
    const [x, y, z] = edges[j];
    if (find(x) !== find(y)) {
      union(x, y);
      cost += z;
      cnt++;
    }

    if (cnt === m) break; //모든 간선을 순회하기전에 mst가 완성
  }

  console.log(totalCost - cost);
  i += n;
}
