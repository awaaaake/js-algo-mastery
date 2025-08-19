const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");

//뿌요가 터지는 경우 : 같은 색의 뿌요들이 4개 이상
const board = input.map((row) => row.trim().split(""));
const n = board[0].length;
const m = board.length;

const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];
let answer = 0;

//연결된 지역의 개수찾기
function bfs(startX, startY, visited, toPop) {
  const color = board[startX][startY];
  const comp = [[startX, startY]]; //연결된 모든 노드
  const queue = [[startX, startY]];
  visited[startX][startY] = true;

  while (queue.length) {
    const [x, y] = queue.shift();
    //vistied를 왜 여기 작성하면 안될까? 11,1 11,1이 중복으로 큐에 들어갔음

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx >= 0 && nx < m && ny >= 0 && ny < n) {
        if (!visited[nx][ny] && board[nx][ny] === color) {
          visited[nx][ny] = true;
          comp.push([nx, ny]);
          queue.push([nx, ny]);
        }
      }
    }
  }

  if (comp.length >= 4) {
    for (const [x, y] of comp) toPop[x][y] = true;
    return true;
  }
  return false;
}

function applyGravity() {
  for (let y = 0; y < n; y++) {
    let pos = m - 1; //뿌요가 떨어질 위치
    for (let x = m - 1; x >= 0; x--) {
      if (board[x][y] !== ".") {
        board[pos][y] = board[x][y];
        if (pos !== x) board[x][y] = "."; //같은칸은 덮어쓰면 안됨 -> 자기 자신을 지워버리는 셈
        pos--;
      }
    }
  }
}

while (true) {
  let poppedAny = false;
  const visited = Array.from({ length: m }, () => new Array(n).fill(false));
  const toPop = Array.from({ length: m }, () => new Array(n).fill(false));

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (!visited[i][j] && board[i][j] !== ".") {
        if (bfs(i, j, visited, toPop)) poppedAny = true;
      }
    }
  }

  if (!poppedAny) break; //터진게 없으면 중단
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (toPop[i][j]) board[i][j] = ".";
    }
  }

  applyGravity();
  answer++;
}

console.log(answer);
