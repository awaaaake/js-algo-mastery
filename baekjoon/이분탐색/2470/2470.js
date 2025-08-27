const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [N] = input[0];
const arr = input[1];

arr.sort((a, b) => a - b);
let answer = [0, 0, Infinity];

for (let i = 0; i < N; i++) {
  binarySearch(arr[i], i);
}

console.log(
  answer
    .slice(0, 2)
    .sort((a, b) => a - b)
    .join(" ")
);

function binarySearch(x, i) {
  let left = 0;
  let right = N - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const sum = x + arr[mid];

    if (Math.abs(sum) < answer[2] && mid !== i) {
      answer = [x, arr[mid], Math.abs(sum)];
      if(sum===0) return;
    } 
    
    if (sum < 0) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
}
