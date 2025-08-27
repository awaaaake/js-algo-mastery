const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [n] = input[0];
const arr = input[1];
const [m] = input[2];
const arr2 = input[3];

arr.sort((a, b) => a - b);
const answer = [];
for (let i = 0; i < m; i++) {
  const result = binarySearch(arr2[i]);
  answer.push(result ? 1 : 0);
}

console.log(answer.join(" "));

function binarySearch(x) {
  let left = 0;
  let right = n - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === x) {
      return true;
    } else if (arr[mid] < x) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return false;
}
