const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [N] = input.shift();
const arr = input.shift();
let left = 0;
let right = N - 1;
let answer = [2000000000, 0, 0]; //각 용액의 특성값의 합, 특성값..

while (left < right) {
  //서로다른 두 용액이어야함
  const sum = arr[left] + arr[right];
  answer =
    Math.abs(sum) < answer[0] ? [Math.abs(sum), arr[left], arr[right]] : answer;
  if (sum === 0) {
    break;
  } else if (sum > 0) {
    right--;
  } else if (sum < 0) {
    left++;
  }
}

console.log(answer[1], answer[2]);
