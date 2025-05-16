const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/class2/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");
const numArr = input[1].split(" ").map(Number);
const answer = [];
const numSet = [...new Set(numArr)].sort((a, b) => a - b);
let dic = {};
numSet.forEach((el, index) => (dic[el] = index));//num를 키로, index를 value로 하는 dic객체
for (let val of numArr) {
  const currIndex = dic[val];//currIndex = 자신(val)보다 작은 수들의 개수
  answer.push(currIndex);
}
console.log(answer.join(" "));
