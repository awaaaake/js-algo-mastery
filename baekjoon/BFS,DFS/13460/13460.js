const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input[0].split(" ").map(Number);
const board = input.slice(1).map((row) => row.trim().split(""));
let rx, ry, bx, by, holeX, holeY;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (board[i][j] === "R") {
      rx = i;
      ry = j;
    } else if (board[i][j] === "B") {
      bx = i;
      by = j;
    } else if (board[i][j] === "O") {
      holeX = i;
      holeY = j;
    }
  }
}

const move = (x, y, dx, dy) => {
  let moves = 0;

  while (board[x + dx][y + dy] !== "#" && board[x][y] !== "O") {
    //벽을 마주하거나, 구멍을 만난경우
    x += dx;
    y += dy;
    moves++;
  }
  return [x, y, moves];
};

const bfs = () => {
  const queue = [[0, rx, ry, bx, by]];
  const visited = new Set();

  visited.add(`${rx}.${ry},${bx},${by}`);

  const dx = [0, 1, 0, -1];
  const dy = [1, 0, -1, 0];

  while (queue.length) {
    const [cnt, rX, rY, bX, bY] = queue.shift();

    if (cnt >= 10) return -1;

    for (let i = 0; i < 4; i++) {
      let [nextRX, nextRY, movesR] = move(rX, rY, dx[i], dy[i]);
      let [nextBX, nextBY, movesB] = move(bX, bY, dx[i], dy[i]);

      if (nextBX === holeX && nextBY === holeY) continue;
      if (nextRX === holeX && nextRY === holeY) {
        return cnt + 1;
      }

      if (nextBX === nextRX && nextBY === nextRY) {
        if (movesR > movesB) {
          nextRX -= dx[i];
          nextRY -= dy[i];
        } else {
          nextBX -= dx[i];
          nextBY -= dy[i];
        }
      }

      if (!visited.has(`${nextRX}.${nextRY},${nextBX},${nextBY}`)) {
        visited.add(`${nextRX}.${nextRY},${nextBX},${nextBY}`);
        queue.push([cnt + 1, nextRX, nextRY, nextBX, nextBY]);
      }
    }
  }

  return -1;
};

console.log(bfs());
