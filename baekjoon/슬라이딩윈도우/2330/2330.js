const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

//차이가 M 이상이면서 제일 작은 경우
const [N, M] = input[0];
const arr = input.slice(1);

arr.sort((a, b) => a - b);
//수가 2개로 고정
let result = 2000000000;
let b = 0; //두수가 같은 수일 수 있음
for (let s = 0; s < N; s++) {
  while (arr[b] - arr[s] < M && b < N) {
    b++;
  }

  if (arr[b] - arr[s] >= M) {
    result = Math.min(arr[b] - arr[s], result);
  }
}

console.log(result);
