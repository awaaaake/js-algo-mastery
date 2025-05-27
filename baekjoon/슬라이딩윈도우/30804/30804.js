const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const arr = input[1].split(" ").map(Number);
let answer = 0;
const Tanghulu = new Map();

let end = 0;

for (let start = 0; start < N; start++) {
  Tanghulu.set(arr[start], Tanghulu.get(arr[start]) || 0 + 1);

  while (end < N && Tanghulu.size <= 2) {
    end++;
    Tanghulu.set(arr[end], (Tanghulu.get(arr[end]) || 0) + 1);
  }
  answer = Math.max(answer, end - start); //end가 1증가된 상태이므로 (end-start+1)-1

  //현재 start 과일 제거
  Tanghulu.set(arr[start], (Tanghulu.get(arr[start]) || 0) - 1);
  if (Tanghulu.get(arr[start]) <= 0) Tanghulu.delete(arr[start]);
}

console.log(answer);
