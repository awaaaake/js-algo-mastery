const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [n, m] = input[0];
const arr = input[1];
//구간합이 m이 되는 경우의 수, 투포인터

let sum = 0;
let end = 0;
let result = 0;
for (let start = 0; start < n; start++) {
  while (sum < m && end < n) {
    sum += arr[end];
    end++;
  }

  if (sum === m) {
    result++;
  }

  sum -= arr[start];
}

console.log(result);
