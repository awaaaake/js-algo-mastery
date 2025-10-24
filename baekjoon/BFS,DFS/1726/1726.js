//가능한 모든 경로 다찾아보기?
const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

//로봇을 도착 지점에 원하는 방향으로 이동시키는데 필요한 최소 명령 횟수
const [M, N] = input[0];
const board = input.slice(1, 1 + M);

let [sx, sy, sd] = input[M + 1];
let [ex, ey, ed] = input[M + 2];
const visited = Array.from({ length: M }, () =>
  Array.from({ length: N }, () => new Array(5).fill(false))
);

sx -= 1;
sy -= 1;
ex -= 1;
ey -= 1;

const directions = {
  1: [0, 1],
  2: [0, -1],
  3: [1, 0],
  4: [-1, 0],
};

const nextDirs = {
  1: [3, 4],
  2: [3, 4],
  3: [1, 2],
  4: [1, 2],
};

function bfs() {
  const queue = [[sx, sy, sd, 0]];
  visited[sx][sy][sd] = true;

  while (queue.length) {
    const [x, y, dir, cnt] = queue.shift();

    if (x === ex && y === ey && dir === ed) {
      return cnt;
    }

    //동쪽이 1, 서쪽이 2, 남쪽이 3, 북쪽이 4

    //현재의 dir을 유지x
    for (let nd of nextDirs[dir]) {
      if (!visited[x][y][nd]) {
        visited[x][y][nd] = true;
        queue.push([x, y, nd, cnt + 1]);
      }
    }

    //현재 dir을 유지o
    for (let k = 1; k <= 3; k++) {
      let nx = x + directions[dir][0] * k;
      let ny = y + directions[dir][1] * k;

      if (nx < 0 || nx >= M || ny < 0 || ny >= N || board[nx][ny] === 1) break;

      if (!visited[nx][ny][dir]) {
        visited[nx][ny][dir] = true;
        queue.push([nx, ny, dir, cnt + 1]);
      }
    }
  }
}

console.log(bfs());
