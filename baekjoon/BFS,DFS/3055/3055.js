const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/example.txt")
  .toString()
  .trim()
  .split("\n");

const [R, C] = input[0].split(" ").map(Number);
const map = input.slice(1).map((line) => line.split(""));

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

const waterTime = Array.from({ length: R }, () => Array(C).fill(-1)); //해당 위치에 물이 퍼지는 시간
const visited = Array.from({ length: R }, () => Array(C).fill(-1)); //고슴도치의 도착 시간

const waterQ = [];
let startX, startY;

// 물 먼저 BFS 큐 준비
for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (map[i][j] === "*") {
      waterQ.push([i, j]); //물의 퍼질 위치
      waterTime[i][j] = 0;
    } else if (map[i][j] === "S") {
      startX = i;
      startY = j;
    }
  }
}

const isInRange = (x, y) => x >= 0 && x < R && y >= 0 && y < C;

//물 BFS(물이 차는 예상 시간을 먼저 모두 계산)
let wp = 0;
while (wp < waterQ.length) {
  const [x, y] = waterQ[wp++];

  for (let d = 0; d < 4; d++) {
    const nx = x + dx[d];
    const ny = y + dy[d];

    if (isInRange(nx, ny) && waterTime[nx][ny] === -1 && map[nx][ny] === ".") {
      waterTime[nx][ny] = waterTime[x][y] + 1;
      waterQ.push([nx, ny]);
    }
  }
}

//고슴도치 bfs
const queue = [[startX, startY]];
visited[startX][startY] = 0; //첫방문 초기화

let qp = 0;
let result = "KAKTUS";

while (qp < queue.length) {
  const [x, y] = queue[qp++];

  for (let d = 0; d < 4; d++) {
    const nx = x + dx[d];
    const ny = y + dy[d];

    if (isInRange(nx, ny)) {
      const nextTime = visited[x][y] + 1;

      if (map[nx][ny] === "D") {
        result = nextTime;
        console.log(result);
        return;
        //여기서 break;를 하면 for문만 빠져나가지 계속 탐색 -> return으로 즉시 종료
      }

      //갈수있는 길이고, 아직 간적 없고, 물이 안차거나 물이 차기전에 도치가 먼저 도착가능하다면
      if (
        map[nx][ny] === "." &&
        visited[nx][ny] === -1 &&
        (waterTime[nx][ny] === -1 || nextTime < waterTime[nx][ny])
      ) {
        visited[nx][ny] = nextTime;
        queue.push([nx, ny]);
      }
    }
  }
}

console.log(result); //고슴도치가 비버의 굴에 도착하지못할 경우를 대피한 디폴트 출력
