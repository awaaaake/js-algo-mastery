const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/class2/example.txt")
  .toString()
  .trim()
  .split("\n");

let [size, ...arr] = input;
const [row, col] = size.split(" ");
arr = arr.map((row) => row.split(""));
const answer = [];

//하얀색이 먼저 시작하는 판
const white = [
  "WBWBWBWB",
  "BWBWBWBW",
  "WBWBWBWB",
  "BWBWBWBW",
  "WBWBWBWB",
  "BWBWBWBW",
  "WBWBWBWB",
  "BWBWBWBW",
];

//검은색이 먼저 시작하는 판
const black = [
  "BWBWBWBW",
  "WBWBWBWB",
  "BWBWBWBW",
  "WBWBWBWB",
  "BWBWBWBW",
  "WBWBWBWB",
  "BWBWBWBW",
  "WBWBWBWB",
];

function whiteFirst(x, y) {
  //x,y는 기준 좌표
  let count = 0;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (arr[x + i][y + j] !== white[i][j]) count++;
    }
  }
  return count;
}

function blackFirst(x, y) {
  let count = 0;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (arr[x + i][y + j] !== black[i][j]) count++;
    }
  }
  return count;
}

for (let i = 0; i < row - 7; i++) {
  for (let j = 0; j < col - 7; j++) {
    answer.push(whiteFirst(i, j));
    answer.push(blackFirst(i, j));
  }
}

console.log(Math.min(...answer));
