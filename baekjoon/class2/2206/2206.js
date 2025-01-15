const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/class2/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const board = input.slice(1).map((row) => row.trim().split("").map(Number));

// 방문 여부를 기록하는 3차원 배열
const visited = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => [0, 0])
);

const bfs = () => {
  const queue = [[0, 0, 0]]; //초기시작점, 벽을 부순 여부
  visited[0][0][0] = 1;
  let idx = 0; // 큐의 인덱스 관리

  while (idx !== queue.length) {
    let [x, y, isBreak] = queue[idx];

    if (x === N - 1 && y === M - 1) {
      return visited[x][y][isBreak];
    }

    for (let [nx, ny] of [
      [x + 1, y],
      [x, y + 1],
      [x - 1, y],
      [x, y - 1],
    ]) {
      if (nx >= 0 && nx < N && ny >= 0 && ny < M) {
        //벽이 아닌 경우, 아직방문한적이없다면면
        if (board[nx][ny] === 0 && visited[nx][ny][isBreak] === 0) {
          visited[nx][ny][isBreak] = visited[x][y][isBreak] + 1;
          queue.push([nx, ny, isBreak]);
        } else if (board[nx][ny] === 1 && isBreak === 0) {
          //벽을 만났을 때때, 벽을 아직 부순적이없다면
          visited[nx][ny][1] = visited[x][y][0] + 1; //벽을 부수지않고온 경로의 길이 +1
          queue.push([nx, ny, 1]);
        }
      }
    }
    idx++;
  }

  return -1;
};

console.log(bfs());

// console.log("visited[i][j][0]:");
// for (let i = 0; i < N; i++) {
//   let row = "";
//   for (let j = 0; j < M; j++) {
//     row += visited[i][j][0] + " ";
//   }
//   console.log(row.trim()); // 마지막 공백 제거
// }

// console.log("visited[i][j][1]:");
// for (let i = 0; i < N; i++) {
//   let row = "";
//   for (let j = 0; j < M; j++) {
//     row += visited[i][j][1] + " ";
//   }
//   console.log(row.trim()); // 마지막 공백 제거
// }
