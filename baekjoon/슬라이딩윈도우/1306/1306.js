const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [N, M] = input[0];
const lights = input[1];
const range = 2 * M - 1;

const deque = []; //인덱스를 저장할 deque -> 앞: 현재 슬라이딩 윈도우 범위내의 최댓값 인덱스, 뒤:추후 슬라이딩 윈도우의 최댓값으로 유망한 인덱스
const answer = [];

//슬라이딩 윈도우
for (let i = 0; i < N; i++) {
  //유망하지않은 값들의 인덱스 모두 제거
  while (deque.length && lights[deque[deque.length - 1]] <= lights[i]) {
    deque.pop(); //deque의 뒤에서부터 현재 새롭게 추가할 값보다 더작다면 제거
  }

  //현재 새로운 값의 인덱스 추가
  deque.push(i);

  //최댓값으로 유망한 인덱스가 현재 슬라이딩 윈도우 범위를 벗어나면 제거
  while (deque[0] <= i - range) deque.shift(); //i-range+1 ~ i : 현재 슬라이딩 위도우의 범위, deque에서 앞선 범위들에 해당하는 인덱스들은 다 제거해야함

  //슬라이딩 윈도우의 크기(range)이상의 범위를 충족했다면
  if (i >= range - 1) {
    answer.push(lights[deque[0]]);
  }
}

console.log(answer.join(" "));
