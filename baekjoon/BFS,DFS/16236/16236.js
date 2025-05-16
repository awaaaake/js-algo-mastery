const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [N] = input.shift();
const grid = input;
let bsP = [];
//아기상어 : 2, 자신보다 큰물고기x, 작은물고기 먹어, 같으면 지나갈수만o
//먹을 수있는 물고기 > 1 : 가장위, 가장 왼쪽 순서로
//물고기 한마리당 1씩증가
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (grid[i][j] === 9) bsP = [i, j];
  }
}

const bfs = () => {
  const visited = grid.map((r) => [...r]);
  const queue = [[2, 0, ...bsP, ...visited]];
  visited[bsP[0]][bsP[1]] = 0; //방문하면 -> 0

  while (queue.length > 0) {
    let [bsSize, time, x, y, ...visited] = queue.shift();
    console.log(
      "bsSize",
      bsSize,
      "time",
      time,
      "위치:",
      x,
      y,
      "방문:",
      visited
    );
    if (visited.every((r) => r.every((el) => el > bsSize || el===0))) return time;

    for (let [nx, ny] of [
      [x - 1, y],
      [x, y - 1],
      [x, y + 1],
      [x + 1, y],
    ]) {
      if (nx >= 0 && nx < N && ny >= 0 && ny < N) {
        const nV = grid[nx][ny];
        if (nV <= bsSize) {
          isPossible = true;
          if (nV < bsSize) {
            visited[nx][ny] = 0;//잡아먹은 물고기 방문표시 => 0
            bsSize += 1;
          }
          queue.push([bsSize, ++time, nx, ny, ...visited]);
        }
      }
    }
  }
};

const answer = bfs();
console.log(answer);
