const input = require("fs")
  .readFileSync("./baekjoon/class2/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");
const [N, M] = input.shift().split(" ").map(Number);
let target = [-1, -1];
const board = input.map((row) => row.split(" ").map(Number));
const answer = [];

for (let i = 0; i < N; i++) {
  let row = [];
  for (let j = 0; j < M; j++) {
    if (board[i][j] === 2 || board[i][j] === 0) {
      if (board[i][j] === 2) target = [i, j];
      row.push(0);
    } else {
      row.push(-1);
    }
  }
  answer.push(row);
}

const bfs = (start) => {
  const queue = [start];
  while (queue.length > 0) {
    let [i, j, dist] = queue.shift();

    if (board[i][j] !== 0) {
      dist++;
    }

    for (let [nextI, nextJ] of [
      [i + 1, j],
      [i - 1, j],
      [i, j + 1],
      [i, j - 1],
    ]) {
      if (
        nextI >= 0 &&
        nextI < N &&
        nextJ >= 0 &&
        nextJ < M &&
        answer[nextI][nextJ] === -1
      ) {
        answer[nextI][nextJ] = dist; //현재 위치(i,j)가 추가된 거리가, 다음 위치의 answer값으로 설정된다.
        queue.push([nextI, nextJ, dist]);
      }
    }
  }
};

bfs([...target, 0]);
console.log(answer.map((row) => row.join(" ")).join("\n"));
