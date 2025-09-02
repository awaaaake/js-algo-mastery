const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [N, L, R] = input[0];
const board = input.slice(1);

const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

function bfs(sx, sy) {
  let sum = board[sx][sy];
  const queue = [[sx, sy]];
  const pos = [[sx, sy]]; //연합에 속한 칸들
  visited[sx][sy] = true;

  while (queue.length) {
    const [x, y] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx >= 0 && nx < N && ny >= 0 && ny < N) {
        const diff = Math.abs(board[x][y] - board[nx][ny]);

        if (!visited[nx][ny] && diff >= L && diff <= R) {
          visited[nx][ny] = true;
          sum += board[nx][ny];
          queue.push([nx, ny]);
          pos.push([nx, ny]);
        }
      }
    }
  }
  
  if (pos.length > 1) {
    //초기에 시작위치 국가[sx,sy]를 포함해 연합이 2칸 이상인 경우에만 인구이동
    const newValue = Math.floor(sum / pos.length);
    for (let [x, y] of pos) {
      board[x][y] = newValue;
    }
    return true;
  }
  return false;
}

let answer = 0;

function move() {
  let days = 0;

  while (true) {
    //하루 시작 -> 방문 초기화
    visited = Array.from({ length: N }, () => new Array(N).fill(false));
    //하루동안 연합 여부
    let moved = false;

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (!visited[i][j]) {
          if (bfs(i, j)) moved = true; //하루동안 한개이상의 연합이 이루어졌다면
        }
      }
    }

    if (!moved) break; //연합이 하나도 이루어지지x -> 더이상의 인구이동은x
    days++;
  }
  return days;
}

console.log(move());
