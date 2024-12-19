//입력받는 부분
const fs = require("fs");
const input = Number(fs.readFileSync("./baekjoon/class2/example.txt", "utf-8"));

//규칙을 이용한 1번째 풀이
// let answer = 1;
// for (let i = 0; i < 20; i++) {
//   if (input === 1) break;
//   else if (2 ** i < input && input <= 2 ** (i + 1)) {
//     answer = 2 * (input - 2 ** i);
//     break;
//   }
// }
// console.log(answer);

//배열을 순회하면서 카드를 재배치하는 풀이
const cards = Array.from({ length: input }, (_, index) => index + 1);
let i = 0;
while (i < cards.length - 1) {
  //인덱스가 짝수면 건너뜀
  if (i % 2 === 0) {
    i++;
  } else {
    cards.push(cards[i++]);
  }
}

console.log(cards[i]);
