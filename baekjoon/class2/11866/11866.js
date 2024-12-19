const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/class2/example.txt")
  .toString()
  .trim()
  .split(" ");
const N = +input[0];
const K = +input[1];

const arr = Array.from({ length: N }, (_, index) => index + 1);
let answer = [];

for (let i = 0; i < N; i++) {
  for (let j = 1; j <= K; j++) {
    if (j === K) {
      answer.push(arr.shift());
    } else {
      arr.push(arr.shift());
    }
  }
}

console.log("<" + answer.join(", ") + ">");
