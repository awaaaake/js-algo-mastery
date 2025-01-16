const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/class2/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");

const T = +input.shift();
const inputArr = input.map((row) => row.split(" ").map(Number));
let farm = [];
let visited = [];

//상하좌우
const row = [0, 0, -1, 1];
const col = [-1, 1, 0, 0];

const dfs = (j, k, N, M) => {
  visited[j][k] = 1;
  for (let i = 0; i < 4; i++) {
    const newJ = j + col[i];
    const newK = k + row[i];
    if (newJ >= 0 && newJ < N && newK >= 0 && newK < M) {
      //인접한 새로운 좌표가 그래프범위안에 있고
      if (farm[newJ][newK] === 1 && visited[newJ][newK] === 0) {
        //배추가 있고, 방문을 하지않았다면
        dfs(newJ, newK, N, M);
      }
    }
  }
};

for (let i = 0; i < T; i++) {
  let answer = 0;
  let [M, N, K] = inputArr.shift();
  farm = Array.from(Array(N), () => new Array(M).fill(0));
  visited = Array.from(Array(N), () => new Array(M).fill(0));

  while (K > 0) {
    K--;
    const [x, y] = inputArr.shift();
    farm[y][x] = 1;
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (farm[i][j] === 1 && visited[i][j] === 0) {
        answer++;
        dfs(i, j, N, M);
      }
    }
  }

  console.log(answer);
}
