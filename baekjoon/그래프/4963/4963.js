const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

//섬의 개수 찾기 -> union-find (최소스패닝 트리)
let i = 0;
const dx = [0, 0, -1, 1, -1, 1, -1, 1];
const dy = [1, -1, 0, 0, -1, 1, 1, -1];

while (i < input.length) {
  const [w, h] = input[i++];

  if (w === 0 && h === 0) break;
  const map = input.slice(i, i + h);
  const visited = Array.from({ length: h }, () => new Array(w).fill(false));
  let count = 0;
  const bfs = (sx, sy) => {
    const queue = [[sx, sy]];

    while (queue.length) {
      const [x, y] = queue.shift();

      for (let dir = 0; dir < 8; dir++) {
        const nx = x + dx[dir];
        const ny = y + dy[dir];

        if (nx >= 0 && nx < h && ny >= 0 && ny < w) {
          if (map[nx][ny] === 1 && !visited[nx][ny]) {
            visited[nx][ny] = true;
            queue.push([nx, ny]);
          }
        }
      }
    }
  };

  for (let x = 0; x < h; x++) {
    for (let y = 0; y < w; y++) {
      if (map[x][y] === 1 && !visited[x][y]) {
        bfs(x, y);
        count++;
      }
    }
  }

  console.log(count);
  i += h;
}

//dfs or bfs로 풀이 가능
