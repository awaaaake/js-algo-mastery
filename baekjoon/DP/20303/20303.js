const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((r) => r.split(" ").map(Number));

const [N, M, K] = input[0];
const candies = [0, ...input[1]];
const parent = Array(N + 1)
  .fill()
  .map((_, i) => i);

let groupCandies = new Map();
const find = (x) => {
  if (parent[x] === x) return x;
  return (parent[x] = find(parent[x]));
};

const union = (a, b) => {
  let rootA = find(a);
  let rootB = find(b);
  if (rootA !== rootB) {
    a < b ? (parent[rootB] = rootA) : (parent[rootA] = rootB);
  }
};

for (let i = 2; i < 2 + M; i++) {
  const [a, b] = input[i];
  union(a, b);
}

for (let i = 1; i <= N; i++) {
  //parent가 같은 아이끼리 그룹으로 묶기
  const root = find(i);//parent[i] 가아닌 find(i)를 해야함
  if (!groupCandies.has(root)) {
    groupCandies.set(root, [0, 0]);
  }
  groupCandies.get(root)[0]++;
  groupCandies.get(root)[1] += candies[i];
}

const dp = new Array(K).fill(0);
for (let [crying, candies] of groupCandies.values()) {
  for (let j = K - 1; j >= crying; j--) {
    //K:어른들에게 들키지 않는 최대 아이 수
    dp[j] = Math.max(dp[j], dp[j - crying] + candies);
  }
}

console.log(Math.max(...dp));//console.log(dp[K-1])

