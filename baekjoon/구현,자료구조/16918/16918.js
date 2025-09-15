const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");

//폭탄 3초후 폭발 -> 빈칸, 인접 네칸도 파괴
//폭탄 옆에 폭탄이있는 경우 인접한 폭탄은 폭발x(연쇄반응x)
//폭탄 설치(A) -1초-> 아무것도x -1초-> 나머지칸 폭탄설치(B) -1초-> 폭탄(A) 모두 폭발

const [R, C, N] = input[0].split(" ").map(Number);
const init = input.slice(1).map((row) => row.trim().split(""));
const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];
let answer;
if (N === 1) answer = init;
else if (N % 2 === 0) {
  answer = fullO();
} else if (N % 4 === 3) {
  answer = bomb(init);
} else if (N % 4 === 1) {
  answer = bomb(bomb(init));
}

console.log(answer.map((row) => row.join("")).join("\n"));

function bomb(from) {
  const toClear = Array.from({ length: R }, () => Array(C).fill(false));

  for (let x = 0; x < R; x++) {
    for (let y = 0; y < C; y++) {
      if (from[x][y] === "O") {
        toClear[x][y] = true;

        for (let dir = 0; dir < 4; dir++) {
          const nx = x + dx[dir];
          const ny = y + dy[dir];
          if (nx >= 0 && nx < R && ny >= 0 && ny < C) {
            toClear[nx][ny] = true;
          }
        }
      }
    }
  }

  const next = Array.from({ length: R }, () => Array(C).fill("O"));
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (toClear[i][j]) {
        next[i][j] = ".";
      }
    }
  }
  return next;
}

function fullO() {
  return Array.from({ length: R }, () => new Array(C).fill("O")); //나머지칸 폭탄 설치
}
