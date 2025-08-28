const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

//자기의 바로 왼쪽 좌석 또는 바로 오른쪽 좌석으로는 자리를 옮길 수 있다
//“VIP 회원”은 반드시 자기 좌석에만 앉아야 하며 옆 좌석으로 자리를 옮길 수 없다.
//사람들이 좌석에 앉는 서로 다른 방법의 가짓수

const N = input[0];
const M = input[1];
const vip = input
  .slice(2, 2 + M)
  .map(Number)
  .sort((a, b) => a - b);

//vip 기준 구간 길이 계산
const segments = [];
let prev = 0;
for (const v of vip) {
  const len = v - 1 - prev;
  if (len > 0) segments.push(len);
  prev = v;
}

const tail = N - prev;
if (tail > 0) segments.push(tail);

const maxLen = segments.length ? Math.max(...segments) : 0;
const ways = new Array(maxLen + 1).fill(0);
ways[0] = 1; //좌석x
ways[1] = 1; //좌석 1개 -> 교환x
for (let i = 2; i <= maxLen; i++) {
  ways[i] = ways[i - 1] + ways[i - 2];
}

//매 구간마다 새롭게 dp를 구할필요x
//길이가 최대인 구간의 dp값을 구해두고, 재활용
let answer = 1;
for (const len of segments) {
  answer *= ways[len];
}

console.log(answer.toString());
