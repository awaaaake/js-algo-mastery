const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [N, M] = input.shift();
const grid = input.map((r) => [...r]);

// 격자 범위 확인
const isInBounds = (x, y) => x >= 0 && x < N && y >= 0 && y < M;

//외부 공기 영역 찾기 -> visited 반환
const bfs = () => {
  const queue = [[0, 0]];
  const visited = Array.from(Array(N), () => Array(M).fill(false));
  visited[0][0] = true;

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    for (let [nx, ny] of [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ]) {
      if (isInBounds(nx, ny) && !visited[nx][ny] && grid[nx][ny] !== 1) {
        visited[nx][ny] = true;
        queue.push([nx, ny]);
      }
    }
  }

  return visited;
};

const meltCheese = (visited) => {
  const nextGrid = grid.map((r) => [...r]);

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (grid[i][j] === 1) {
        let count = 0; //외부공기와 접촉

        for (let [ni, nj] of [
          [i + 1, j],
          [i - 1, j],
          [i, j - 1],
          [i, j + 1],
        ]) {
          if (grid[ni][nj] === 0 && visited[ni][nj]) {
            //공기인데, 외부공기이면
            count++;
          }
        }
        if (count >= 2) {
          nextGrid[i][j] = 0;
        }
      }
    }
  }

  return nextGrid;
};

let time = 0;
while (true) {
  const visited = bfs(); // 외부 공기와 연결된 영역 찾기
  const nextGrid = meltCheese(visited);

  if (JSON.stringify(nextGrid) === JSON.stringify(grid)) {
    //녹이기 전, 후가 같다는것은 더이상녹일게X
    break; //녹일 치즈가 없으면 종료
  }

  grid.splice(0, N, ...nextGrid);
  time++;
}

console.log(time);
