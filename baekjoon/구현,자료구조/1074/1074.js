const fs = require("fs");
const [N, r, c] = fs
  .readFileSync("./baekjoon/class2/example.txt", "utf-8")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

let res = 0;
const divide = (row, col, size) => {
  if (row === r && col === c) {
    //좌표 찾음
    console.log(res);
    return;
  }

  if (r >= row && r < row + size && c >= 0 && c < col + size) {
    //영역 내에 있음
    size = parseInt(size / 2);
    //divide 호출순서는 좌상, 우상, 좌하, 우하 순으로 Z로 방문해야함
    divide(row, col, size);
    divide(row, col + size, size);
    divide(row + size, col, size);
    divide(row + size, col + size, size);
  } else res += size * size;
};

divide(0, 0, Math.pow(2, N));
