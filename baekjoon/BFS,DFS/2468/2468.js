const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [N] = input[0];
const board = input.slice(1);
let answer = 0;

//비의 양에 따라 안전한 영역의 개수가 달라진다.
//높이는 1이상 100이하의 정수
//비가 낮게 왔다고. 안전영역의 개수가 많은것은 아님
//너무 많이 와도 적게와도, 안전영역의 개수는 적고, 중간쯤 왔을 때, 지대들이 나뉘면서 안정영역의 개수가 많아질수있음
const max = Math.max(...board.flat());

function isInRange(x, y) {
  return x >= 0 && x < N && y >= 0 && y < N;
}

for (let h = 0; h < max; h++) {
  const visited = Array.from({ length: N }, () => new Array(N).fill(false));

  const dx = [0, 0, -1, 1];
  const dy = [1, -1, 0, 0];

  const dfs = (x, y) => {
    visited[x][y] = true;

    for (let dir = 0; dir < 4; dir++) {
      const nx = x + dx[dir];
      const ny = y + dy[dir];
      if (isInRange(nx, ny) && board[nx][ny] > h && !visited[nx][ny]) {
        dfs(nx, ny);
      }
    }
  };

  let cnt = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (board[i][j] > h && !visited[i][j]) {
        dfs(i, j);
        cnt++;
      }
    }
  }

  answer = Math.max(answer, cnt);
}

console.log(answer);
