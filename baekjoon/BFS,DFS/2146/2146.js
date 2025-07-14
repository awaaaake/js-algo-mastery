const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const N = input[0][0];
const board = input.slice(1);

//두섬을 연결하는 최단거리
const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

//1. 섬 구분
function dfs(x, y, id) {
  board[x][y] = id;

  for (let dir = 0; dir < 4; dir++) {
    const nx = x + dx[dir];
    const ny = y + dy[dir];

    if (nx >= 0 && ny >= 0 && nx < N && ny < N && board[nx][ny] === 1) {
      //board값이 1 = 섬이지만 아직 방문하지x)
      dfs(nx, ny, id);
    }
  }
}

let id = 2; //섬번호 2부터 시작
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (board[i][j] === 1) {
      dfs(i, j, id++); //아직 체크되지않은 섬위치에 방문할 때 dfs로 해당 섬을 모두 체크
    }
  }
}

//2. 다리 놓기
function bfs(id) {
  const queue = [];
  const dist = Array.from({ length: N }, () => Array(N).fill(-1));

  //2-1. 섬의 가장자리 좌표(혹은 전체 좌표)를 큐에 넣고 거리 0으로 시작
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (board[i][j] === id) {
        for (let d = 0; d < 4; d++) {
          const ni = i + dx[d];
          const nj = j + dy[d];

          if (ni < 0 || nj < 0 || ni >= N || nj >= N) continue;
          if (board[ni][nj] === 0) {
            queue.push([i, j]);
            dist[i][j] = 0;
            break; // 가장자리만 필요하므로 하나라도 바다와 맞닿으면 break
          }
        }
      }
    }
  }

  //2-2. 다리 놓기
  while (queue.length) {
    const [x, y] = queue.shift();

    for (let d = 0; d < 4; d++) {
      const nx = x + dx[d];
      const ny = y + dy[d];

      if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;

      if (board[nx][ny] > 1 && board[nx][ny] !== id) {
        //다른 섬에 도달
        return dist[x][y];
      }

      if (board[nx][ny] === 0 && dist[nx][ny] === -1) {
        dist[nx][ny] = dist[x][y] + 1;
        queue.push([nx, ny]);
      }
    }
  }

  return Infinity;
}

let answer = Infinity;
for (let i = 2; i < id; i++) {
  answer = Math.min(answer, bfs(i));
}

console.log(answer);
