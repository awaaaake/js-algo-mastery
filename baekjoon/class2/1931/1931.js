const input = require("fs")
  .readFileSync("./baekjoon/class2/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");
const N = +input.shift();
const meetings = input.map((row) => row.split(" ").map(Number));
meetings.sort((a, b) => {
  if (a[1] === b[1]) {
    //끝나는 시간이 같다면 시작시간이 빠른 순으로 정렬
    return a[0] - b[0];
  }
  return a[1] - b[1];
}); //끝나는 시간이 빠른순으로 정렬
let endTime = 0;
let answer = 0;
for (let i = 0; i < N; i++) {
  if (endTime <= meetings[i][0]) {
    answer++;
    endTime = meetings[i][1];
  }
}

console.log(answer);
