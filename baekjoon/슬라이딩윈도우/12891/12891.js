const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");

//부분문자열 길이가 고정 -> 슬라이딩 윈도우
const [s, p] = input[0].split(" ").map(Number);
const dna = input[1];
const data = input[2].split(" ").map(Number);
const cnt = new Map();

let answer = 0;
let start = dna.slice(0, p);
for (let char of start) {
  cnt.set(char, (cnt.get(char) || 0) + 1);
}

for (let i = 0; i <= s - p; i++) {
  //조건확인
  if (
    (cnt.get("A") || 0) >= data[0] &&
    (cnt.get("C") || 0) >= data[1] &&
    (cnt.get("G") || 0) >= data[2] &&
    (cnt.get("T") || 0) >= data[3]
  ) {
    answer++;
  }

  if (i === s - p) break;
  let subtracted = dna[i];
  let added = dna[i + p];

  //빠지고 더해지는 char의 cnt 재계산
  if (cnt.get(subtracted) > 1) {
    cnt.set(subtracted, cnt.get(subtracted) - 1);
  } else if (cnt.get(subtracted) === 1) {
    cnt.delete(subtracted);
  }
  cnt.set(added, (cnt.get(added) || 0) + 1);
}
console.log(answer);
