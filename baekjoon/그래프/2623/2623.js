const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [N, M] = input[0];
const graph = Array.from({ length: N + 1 }, () => []);
const inDegree = new Array(N + 1).fill(0);

for (let i = 1; i <= M; i++) {
  const [count, ...singers] = input[i];
  for (let j = 0; j < count - 1; j++) {
    //마지막 가수는 그 다음 노드x-> 마지막에서 두번째 가수 까지만!
    graph[singers[j]].push(singers[j + 1]);
    inDegree[singers[j + 1]]++;
  }
}
const queue = [];
for (let i = 1; i <= N; i++) {
  if (inDegree[i] === 0) {
    queue.push(i);
  }
}

const result = [];
while (queue.length) {
  const curr = queue.shift();
  result.push(curr);
  for (let next of graph[curr]) {
    inDegree[next]--;
    if (inDegree[next] === 0) {
      queue.push(next);
    }
  }
}

if (result.length === N) {
  console.log(result.join("\n")); //for문을 돌면서 한줄한줄 출력x -> '\n'으로 join한것을 출력함
} else {
  console.log(0); //순서를 지정할수x -> 사이클O
}
