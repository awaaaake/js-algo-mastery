const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

let [R, C, T] = input.shift();
let airF = [];
let dx = [-1, 0, 0, 1];
let dy = [0, -1, 1, 0];

for (let i = 0; i < R; i++) if (input[i][0] === -1) airF.push(i);
let currMap = input;

for (let t = 0; t < T; t++) {
  let newMap = currMap.map((row) => [...row]);

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (currMap[i][j] === -1) continue;
      else if (currMap[i][j]) {
        const res = Math.floor(currMap[i][j] / 5);
        for (let k = 0; k < 4; k++) {
          let nx = i + dx[k];
          let ny = j + dy[k];
          if (
            0 <= nx &&
            nx < R &&
            0 <= ny &&
            ny < C &&
            currMap[nx][ny] !== -1
          ) {
            newMap[nx][ny] += res;
            newMap[i][j] -= res;
          }
        }
      }
    }
  }

  //순환이동
  const nextMap = newMap.map((row) => [...row]);
  //상위 순환
  for (let j = 1; j < C - 1; j++) nextMap[airF[0]][j + 1] = newMap[airF[0]][j]; //우
  for (let i = airF[0] - 1; i >= 0; i--)
    nextMap[i][C - 1] = newMap[i + 1][C - 1]; //위
  for (let j = 0; j < C - 1; j++) nextMap[0][j] = newMap[0][j + 1]; //좌
  for (let i = 1; i < airF[0]; i++) nextMap[i][0] = newMap[i - 1][0]; //아래
  nextMap[airF[0]][1] = 0;
  //하위 순환
  for (let j = 1; j < C - 1; j++) nextMap[airF[1]][j + 1] = newMap[airF[1]][j]; //우
  for (let i = airF[1] + 1; i < R; i++)
    nextMap[i][C - 1] = newMap[i - 1][C - 1]; //아래
  for (let j = 0; j < C - 1; j++) nextMap[R - 1][j] = newMap[R - 1][j + 1]; //좌
  for (let i = R - 2; i >= airF[1] + 1; i--) nextMap[i][0] = newMap[i + 1][0]; //위
  nextMap[airF[1]][1] = 0;
  currMap = nextMap;
}

currMap[airF[0]][0] = 0;
currMap[airF[1]][0] = 0;

const answer = currMap.reduce(
  (acc, row) => acc + row.reduce((acc, el) => acc + el, 0),
  0
);

console.log(answer);
