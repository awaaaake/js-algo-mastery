//치즈가 모두 녹아서 없어지는 데 걸리는 시간
//모두 녹기 한 시간 전에 남아있는 치즈조각이 놓여 있는 칸의 개수
const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [h, w] = input[0];
const board = input.slice(1);
const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

//공기와 접촉하는 치즈의 가장자리 녹이기
function meltingCheese(boundaries) {
  let prevCnt = boundaries.length;
  let hours = 0;

  while (boundaries.length) {
    hours++;
    for (let [x, y] of boundaries) {
      board[x][y] = 0;
    }
    prevCnt = boundaries.length;
    boundaries = findBoundary();
  }

  console.log(hours);
  console.log(prevCnt);
}

function findBoundary() {
  const extAir = Array.from({ length: h }, () => new Array(w).fill(false)); //외부 공기 여부 표시
  const boundaries = [];
  const queue = [[0, 0]];
  extAir[0][0] = true;

  while (queue.length) {
    const [x, y] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx >= 0 && nx < h && ny >= 0 && ny < w) {
        if (!extAir[nx][ny] && board[nx][ny] === 0) {
          extAir[nx][ny] = true;
          queue.push([nx, ny]);
        }
      }
    }
  }

  for (let i = 1; i < h - 1; i++) {
    for (let j = 1; j < w - 1; j++) {
      if (board[i][j] === 1) {
        for (let k = 0; k < 4; k++) {
          const ni = i + dx[k];
          const nj = j + dy[k];
          if (extAir[ni][nj]) {
            boundaries.push([i, j]);
            break;
          }
        }
      }
    }
  }

  return boundaries;
}

const boundaries = findBoundary();
meltingCheese(boundaries);
