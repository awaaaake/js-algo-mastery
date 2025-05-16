//백트래킹: 불필요한 경로를 가지치기
const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [N] = input[0];
const board = input.slice(1);
let answer = 0;

function copyBoard(board) {
  return board.map((row) => [...row]);
}

const move = (board, dir) => {
  const newBoard = copyBoard(board);

  for (let i = 0; i < N; i++) {
    const line = [];
    for (let j = 0; j < N; j++) {
      let val;
      if (dir === 0) val = board[j][i]; //위에서 부터
      if (dir === 1) val = board[N - 1 - j][i]; //아래에서 부터
      if (dir === 2) val = board[i][j]; //왼쪽에서 부터
      if (dir === 3) val = board[i][N - 1 - j]; //오른쪽에서 부터

      if (val !== 0) line.push(val);
    }

    let merged = [];
    for (let j = 0; j < line.length; j++) { //N이 아닌 line.length 기준
      //N-2까지 확인
      if (j <= N - 2 && line[j] === line[j + 1]) {
        merged.push(line[j] * 2); //j+1까지 합쳐짐
        j++; //j+2로 건너뜀
      } else {
        merged.push(line[j]);
      }
    }

    while (merged.length < N) {
      merged.push(0);
    }

    //board 갱신
    for (let j = 0; j < N; j++) {
      if (dir === 0) newBoard[j][i] = merged[j];
      if (dir === 1) newBoard[N - 1 - j][i] = merged[j];
      if (dir === 2) newBoard[i][j] = merged[j];
      if (dir === 3) newBoard[i][N - 1 - j] = merged[j];
    }
  }

  return newBoard;
};

function dfs(board, depth) {
  if (depth === 5) {
    answer = Math.max(answer, ...board.flat());
    return;
  }

  for (let i = 0; i < 4; i++) {
    const next = move(board, i);
    dfs(next, depth + 1);
  }
}

dfs(board, 0);
console.log(answer);
