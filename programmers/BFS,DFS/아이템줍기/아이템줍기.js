function solution(rectangle, characterX, characterY, itemX, itemY) {
  const map = Array.from({ length: 102 }, () => new Array(102).fill(-1));
  for (let row of rectangle) {
    let [sx, sy, ex, ey] = row.map((el) => el * 2);
    for (let i = sx; i < ex + 1; i++) {
      for (let j = sy; j < ey + 1; j++) {
        if (sx < i && i < ex && sy < j && j < ey) {
          map[i][j] = 0; //내부는 0으로 채우기
        } else if (map[i][j] !== 0) {
          //현재 사각형의 내부는 걸러지지만 앞선 다른 사각형의 내부일수도 있으므로
          map[i][j] = 1; //나머지 테두리는 1로 채우기
        }
      }
    }
  }

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  //최단 거리 bfs
  const queue = [[characterX * 2, characterY * 2]];
  const visited = Array.from({ length: 102 }, () => new Array(102).fill(1));
  visited[characterX * 2][characterY * 2] = 0;

  while (queue.length) {
    const [x, y] = queue.shift();
    if (x === itemX * 2 && y === itemY * 2) {
      return visited[x][y] / 2;
    }

    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];

      if (map[nx][ny] === 1 && visited[nx][ny] === 1) {
        queue.push([nx, ny]);
        visited[nx][ny] = visited[x][y] + 1;
      }
    }
  }
}

solution(
  [
    [1, 1, 7, 4],
    [3, 2, 5, 5],
    [4, 3, 6, 9],
    [2, 6, 8, 8],
  ],
  1,
  3,
  7,
  8
);
