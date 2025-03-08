const input = require("fs")
  .readFileSync("./baekjoon/example.txt")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

let [T] = input[0];
let index = 1;
let cnt = 0;

while (T > 0) {
  const [n] = input[index];
  const arr = [0, ...input[index + 1]]; //arr에서 학생번호로 인덱싱하려면 0을 추가
  const visited = new Array(n + 1).fill(false);
  const done = new Array(n + 1).fill(false);

  const dfs = (node) => {
    visited[node] = true;
    const next = arr[node];

    if (!visited[next]) {
      dfs(next);
    } else if (!done[next]) {
      for (let i = next; i !== node; i = arr[i]) {
        cnt++;
      }
      cnt++; //본인포함
    }

    done[node] = true;
  };

  for (let i = 1; i <= n; i++) {
    dfs(i);
  }

  console.log(n - cnt);
  index += 2;
  T--;
  cnt = 0;
}
