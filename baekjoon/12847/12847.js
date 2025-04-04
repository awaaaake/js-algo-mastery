const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((r) => r.split(" ").map(Number));

const [n, m] = input[0];
const arr = input[1];

//연속된 m개의 값의 합이 최대가 되도록
let sum = arr.slice(0, m).reduce((a, b) => a + b, 0);
let result = sum;
for (let i = m; i < n; i++) {
  sum += arr[i] - arr[i - m];
  result = Math.max(result, sum);
}

console.log(result);
