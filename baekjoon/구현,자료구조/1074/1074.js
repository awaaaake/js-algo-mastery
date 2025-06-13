const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [N, r, c] = input[0]; //r,c는 0행이상
let res = 0;

//cnt는 0부터 시작
function divide(size, x, y) {
  if (x === r && y === c) {
    //r행 c열의 값이라면
    console.log(res);
    return;
  }

  if (r >= x && r < x + size && c >= y && c < y + size) {
    //현재 네모영역안에 r,c가 존재하는지, 네모영역 밖이면 현재 네모영역의 크기를 더해줄뿐
    size = parseInt(size / 2);
    //좌상, 우상,좌하, 우하 순으로 방문
    divide(size, x, y);
    divide(size, x, y + size);
    divide(size, x + size, y);
    //z순서대로 방문하므로, 좌표를 벗어난 네모 영역은 좌표가 발견된 이후이므로, 실행되지x
    divide(size, x + size, y + size);
  } else res += size * size;
}

divide(Math.pow(2, N), 0, 0);
