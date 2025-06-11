const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [n] = input[0];
let candidates = input.slice(1).map((el) => {
  return {
    pay: el[0],
    day: el[1],
  };
});

candidates.sort((a, b) => b.pay - a.pay);

//하루에 한곳에서만 강연할 수 있음
let answer = 0;
const days = Array(10001).fill(false); // 최대 d값이 10000

for (let lecture of candidates) {
  for (let d = lecture.day; d >= 1; d--) {
    if (!days[d]) {
      days[d] = true;
      answer += lecture.pay;
      break;
    }
  }
}

console.log(answer);
