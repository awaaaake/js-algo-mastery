const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [N, M] = input[0];
const points = input[1];
points.sort((a, b) => a - b);
const lines = input.slice(2);

for (let [s, e] of lines) {
  //line을 넘어가지않는 점좌표의 최소값과 최대값 찾기
  let left = 0;
  let right = N - 1;

  let lower = N;
  let upper = -1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (points[mid] >= s) {
      lower = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  left = 0;
  right = N - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (points[mid] <= e) {
      upper = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  const count = upper - lower + 1;
  console.log(count > 0 ? count : 0);
}
