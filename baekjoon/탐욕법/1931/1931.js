const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [N] = input[0];
const meetings = new Array(N + 1).fill().map(() => []);
for (let i = 1; i < N + 1; i++) {
  meetings[i] = input[i];
}

//회의시간이 겹치지x -> 회의실을 사용하는 회의의 최대 개수
meetings.sort((a, b) => {
  if (a[1] === b[1]) return a[0] - b[0];
  return a[1] - b[1];
});
//시작시간이 빨라도 끝나는 시간이 늦으면 소용x -> 끝나는 시간이 빠른 순서대로
let prev = 0;
let answer = 0;
for (let mt of meetings) {
  const [start, end] = mt;
  if (start >= prev) {
    answer += 1;
    prev = end;
  }
}
console.log(answer);
