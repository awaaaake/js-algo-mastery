const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");

const N = +input.shift();
const arr = input[0].split(" ").map(Number);
//arr 세개의 요소의 합이 0에 가장 가깝게
//길이가 3으로 고정 연속x

//2개용액의 부분합
let closestSum = Infinity;
let answer = [];
arr.sort((a, b) => a - b);

for (let i = 0; i < N - 2; i++) {
  let left = i + 1;
  let right = N - 1;

  while (left < right) {
    const sum = arr[i] + arr[left] + arr[right];

    if (Math.abs(sum) < Math.abs(closestSum)) {
      closestSum = sum;
      answer = [arr[i], arr[left], arr[right]];
    }

    if (sum < 0) {
      left++;
    } else {
      right--;
    }
  }
}

console.log(answer.join(" "));
