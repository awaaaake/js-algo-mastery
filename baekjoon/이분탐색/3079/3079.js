const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const times = input.slice(1).map(Number);
times.sort((a, b) => a - b); //빠른 심사대 부터

let left = BigInt(1);
let right = BigInt(Math.max(...times) * M);
let answer = right;

// 이분탐색의 대상 : 모든 사람이 심사를 마치는 데 걸리는 시간 T
while (left <= right) {
  let mid = (left + right) / BigInt(2);

  //각 심사관이 mid 시간 동안 처리할 수 있는 사람 수
  let total = BigInt(0);
  for (let i = 0; i < N; i++) {
    total += mid / BigInt(times[i]); //time이 작을수록 많이 처리하니까
    if (total >= BigInt(M)) break;
  }

  if (total < BigInt(M)) {
    left = mid + BigInt(1);
  } else {
    answer = mid;
    right = mid - BigInt(1);
  }
}
console.log(String(answer));
