const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((r) => r.split(" ").map(Number));

const [T] = input[0];
const [n] = input[1];
const A = input[2];
const [m] = input[3];
const B = input[4];

// 부분 배열의 합 구하기
function getSubArrSums(arr) {
  const subarraySums = new Map(); // 부분 배열의 합을 카운트하는 맵

  for (let i = 0; i < arr.length; i++) {
    let sum = 0;
    for (let j = i; j < arr.length; j++) {
      sum += arr[j];
      subarraySums.set(sum, (subarraySums.get(sum) || 0) + 1);
    }
  }
  return subarraySums;
}

// A와 B의 부분 배열 합 계산
const subA = getSubArrSums(A);
const subB = getSubArrSums(B);

let answer = 0;

// subA의 각 합에 대해, subB에서 T - 합을 찾음
for (let [sumA, countA] of subA) {
  const targetB = T - sumA;
  if (subB.has(targetB)) {
    answer += countA * subB.get(targetB); // 각 값의 개수를 곱하여 정답에 더함
  }
}

console.log(answer);
