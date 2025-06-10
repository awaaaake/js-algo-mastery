const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const M = +input[1];
const S = input[2];
//Pn : o가 n개
//s안에 Pn이 몇군데 포함되어있는가?
//최소 IOI임

let answer = 0; //I다음 OI가 n번 나오는 패턴의 횟수
let count = 0; //I다음 OI가 나오는 횟수
for (let i = 0; i < M - 2; i++) {
  if (S[i] === "I" && S[i + 1] === "O" && S[i + 2] === "I") {
    count++;
    if (count === N) {
      answer++;
      count--; //겹치는 패턴을 고려하는 동시에 한번의 OI가 빠짐
    }
    i++;
  } else {
    count = 0;
  }
}
console.log(answer);
