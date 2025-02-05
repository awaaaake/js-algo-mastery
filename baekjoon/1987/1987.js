const input = require("fs")
  .readFileSync("./baekjoon/example.txt")
  .toString()
  .trim()
  .split("\n");

const [R, C] = input.shift().split(" ").map(Number);
const board = input.map((row) => row.trim().split(""));
//문자열 처리는 trim을 써주기

const checked = new Map(); //키가 숫자면 배열, 문자열이면 맵객체
const dir = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];

let answer = 0;
const dfs = (x, y, count) => {
  let end = true; //더이상 전진할 방향이 없을 때
  for (let [dx, dy] of dir) {
    let nx = x + dx;
    let ny = y + dy;

    if (nx >= 0 && nx < R && ny >= 0 && ny < C && !checked.get(board[nx][ny])) {
      //Map 객체에서 존재하지 않는 키를 get 함수로 가져오면 undefined를 반환
      end = false;
      checked.set(board[nx][ny], true); //nx,ny를 거쳐가는경우
      dfs(nx, ny, count + 1);
      checked.set(board[nx][ny], false); //nx,ny를 거쳐가지 않는 경우
    }
  }

  if (end && count > answer) {
    //어떤 방향으로도 전진할 수 없는 경우 count 비교
    answer = count;
  }
};

checked.set(board[0][0], true);
dfs(0, 0, 1);
console.log(answer);
