const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/class2/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");

const inputArr = input.map((row) => row.split(" ").map(Number));
const [H, M] = inputArr.shift();
const trees = inputArr[0];

let start = 1; //절단기의 최소높이
let end = Math.max(...trees); //절단기의 최대 높이
let answer = 0;

while (start <= end) {
  //인덱스로 이분탐색x, 찾고자하는 값인 절단기높이 자체를 이분탐색
  let mid = Math.floor((start + end) / 2);
  let sum = 0;
  for (let val of trees) {
    if (val > mid) sum += val - mid;
  }

  if (sum >= M) {
    if (mid > answer) answer = mid;
    start = mid + 1;
  } else {
    end = mid - 1;
  }
}

console.log(answer);
