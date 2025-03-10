const input = require("fs")
  .readFileSync("./baekjoon/example.txt")
  .toString()
  .trim()
  .split("\n")
  .map((r) => r.trim());

let T = +input[0];
let index = 1;

while (T > 0) {
  const [h, w] = input[index].split(" ").map(Number);
  const building = input
    .slice(index + 1, index + h + 1)
    .map((row) => row.split(""));
  const initialKeys = input[index + h + 1];
  const keys = new Set(initialKeys === "0" ? [] : initialKeys.split(""));

  const visited = Array.from(Array(h), () => Array(w).fill(false));
  const doors = {}; //열쇠가 없어서 아직 열지 못한 문
  for (let i = 0; i < 26; i++) {
    doors[String.fromCharCode(65 + i)] = [];
  }
  const queue = [];
  let doc = 0;

  //외곽탐색
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (i === 0 || i === h - 1 || j === 0 || j === w - 1) {
        if (building[i][j] !== "*" && !visited[i][j]) {
          if (building[i][j] === "$") {
            doc++;
          }
          if (building[i][j] >= "A" && building[i][j] <= "Z") {
            //문인데 열쇠가 없다면, 문의 위치저장하고 방문은 건너뜀
            if (!keys.has(building[i][j].toLowerCase())) {
              doors[building[i][j]].push([i, j]);
              continue;
            }
          }

          if (building[i][j] >= "a" && building[i][j] <= "z") {
            //열쇠를 발견하면 저장
            if (!keys.has(building[i][j])) {
              keys.add(building[i][j]);
              // 해당 문을 모두 열 수 있게 함
              const doorKey = building[i][j].toUpperCase();
              while (doors[doorKey].length > 0) {
                queue.push(doors[doorKey].pop()); //문의위치를 큐에
              }
            }
          }
          queue.push([i, j]);
          visited[i][j] = true;
        }
      }
    }
  }

  const bfs = () => {
    while (queue.length > 0) {
      const [x, y] = queue.shift();
      for (let [nx, ny] of [
        [x + 1, y],
        [x, y + 1],
        [x - 1, y],
        [x, y - 1],
      ]) {
        if (nx >= 0 && nx < h && ny >= 0 && ny < w) {
          const status = building[nx][ny];

          if (!visited[nx][ny] && status !== "*") {
            visited[nx][ny] = true;
            //알파벳 or 문서
            if (status === "$") {
              doc++;
            } else if (status >= "a" && status <= "z") {
              //소문자이면
              if (!keys.has(status)) {
                keys.add(status);
                const doorKey = status.toUpperCase();
                //그 키를 필요로 하는 문의 위치를 모두 제거하면서, 그 위치를 큐에 추가
                while (doors[doorKey].length > 0) {
                  queue.push(doors[doorKey].pop());
                }
              }
            } else if (status >= "A" && status <= "Z") {
              //대문자이면
              if (!keys.has(status.toLowerCase())) {
                doors[status].push([nx, ny]);
                continue; // 큐에 추가하지 않고 건너뜀
              }
            }

            queue.push([nx, ny]);
          }
        }
      }
    }
  };

  bfs();
  console.log(doc);

  T--;
  index += h + 2;
}
