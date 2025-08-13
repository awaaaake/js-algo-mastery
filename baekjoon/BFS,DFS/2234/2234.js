const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

/**
 * 이 성에 있는 방의 개수
   가장 넓은 방의 넓이
   하나의 벽을 제거하여 얻을 수 있는 가장 넓은 방의 크기
 */

const [N, M] = input[0];
const board = input.slice(1, M + 1);
const dir = [
  [+1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];
const MASKS = [8, 4, 2, 1];
//dfs
const visited = Array.from({ length: M }, () => new Array(N).fill(0));
let size = 0;
let roomNum = 0;
const dfs = (x, y) => {
  visited[x][y] = roomNum;
  //1111 => 남,동,북,서
  const num = board[x][y];

  for (let i = 0; i < 4; i++) {
    if ((num & MASKS[i]) === 0) {
      const nx = x + dir[i][0];
      const ny = y + dir[i][1];

      if (nx >= 0 && nx < M && ny >= 0 && ny < N && !visited[nx][ny]) {
        size++;
        dfs(nx, ny);
      }
    }
  }
};

let cnt = 0;
const sizes = [0];
for (let i = 0; i < M; i++) {
  for (let j = 0; j < N; j++) {
    if (!visited[i][j]) {
      cnt++;
      roomNum++;
      size = 1;

      dfs(i, j);
      sizes.push(size);
    }
  }
}

let maxSum = 0;
for (let i = 0; i < M; i++) {
  for (let j = 0; j < N; j++) {
    for (let k = 0; k < 4; k++) {
      const ni = i + dir[k][0];
      const nj = j + dir[k][1];
      if (ni >= 0 && ni < M && nj >= 0 && nj < N) {
        const currNum = visited[i][j];
        const nextNum = visited[ni][nj];
        if (currNum !== nextNum)
          maxSum = Math.max(maxSum, sizes[currNum] + sizes[nextNum]);
      }
    }
  }
}

console.log(cnt);
console.log(Math.max(...sizes));
console.log(maxSum);
