const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [N] = input[0];
const requests = input[1];
const [M] = input[2];

//모든 요청이 배정될 수 있는 경우 : 요청한 금액을 그대로 배정
//모든 요청이 배정될 수 없는 경우 : 특정한 정수 상한액을 계산하여 그 이상인 예산요청에는 모두 상한액을 배정

const sum = requests.reduce((curr, acc) => acc + curr, 0);

if (sum <= M) {
  console.log(Math.max(...requests));
  return;
}

let left = 1;
let right = 100000;
let std = 0; //정수 상한액의 최댓값

while (left <= right) {
  //특정한 정수 상한액
  let mid = Math.floor((left + right) / 2);
  const currSum = requests.reduce(
    (acc, curr) => acc + (curr >= mid ? mid : curr),
    0
  );

  if (currSum <= M) {
    left = mid + 1;
    std = mid;
  } else {
    right = mid - 1;
  }
}

console.log(std);
