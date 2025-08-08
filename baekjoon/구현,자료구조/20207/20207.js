const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

/**
 * 시작일이 가장 앞선 일정부터 차례대로
 * 시작일이 같을 경우 일정의 기간이 긴 것이 먼저
 * 일정은 가능한 최 상단에
 * 일정 하나의 세로의 길이는 1, 하루의 폭은 1
 * 코팅지의 면적 구하기
 */
const [n] = input[0];
const schedules = input.slice(1);

const Calendar = new Array(366).fill(0); //1~365까지 사용

//1. 달력에 일정 표시
for (let i = 1; i <= n; i++) {
  const [s, e] = schedules[i - 1];
  for (let day = s; day <= e; day++) {
    Calendar[day]++;
  }
}

//2.지사각형 넓이 계산
let answer = 0;
let width = 0;
let height = 0;

for (let day = 1; day <= 365; day++) {
  if (Calendar[day] > 0) {
    //일정이 계속 이어지는 동안
    width++;
    height = Math.max(height, Calendar[day]);
  } else {
    answer += width * height;
    width = 0;
    height = 0;
  }
}

answer += width * height; //마지막 구간 더하기(안끊기고 끝날 수 있으므로)

console.log(answer);
