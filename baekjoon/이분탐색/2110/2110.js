const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");

const [N, C] = input.shift().split(" ").map(Number);
const pos = input.map(Number);
pos.sort((a, b) => a - b);

//가장 인접한 두 공유기 사이의 최대 거리
let start = 1; //가능한 최소 거리
let end = pos[N - 1] - pos[0]; //가능한 최대 거리

while (start <= end) {
  const mid = Math.floor((start + end) / 2);

  let count = 1; //최소 한개 설치
  let prev = pos[0];
  for (const cur of pos) {
    //간격을 고려하면서 공유기를 설치해나감
    if (cur - prev < mid) continue; //공유기 간격의 거리가 mid이상일 때만 설치
    prev = cur; //현재 설치한 공유기를 기준으로 그다음 공유기를 설치해야함
    count += 1;
  }

  if (count < C) end = mid - 1; //조건을 만족하는 가장 큰 거리
  else start = mid + 1; //설치한 총 공유기 수가 C이상일 때 간격을 더 키움
}

console.log(end);
