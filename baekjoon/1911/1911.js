const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [N, L] = input.shift();
input.sort((a, b) => a[0] - b[0]);

let answer = 0;
let prev = -1; // 널빤지를 놓은 마지막 위치

for (let i = 0; i < N; i++) {
  let [s, e] = input[i];
  if (e <= prev) {
    //현재 s는 이전 웅덩이의 s위치 이상인 상황
    continue;
  }
  if (s <= prev) {
    s = prev + 1;
  }
  const temp = Math.ceil((e - s) / L);
  answer += temp;
  prev = s + L * temp - 1;
}
console.log(answer);
