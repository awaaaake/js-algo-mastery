const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/class2/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");
const numArr = input[1].split(" ").map(Number);
numArr.sort((a,b) => a-b);
const cumulativeSum = numArr.reduce((acc, curr, index) => {
  if (index === 0) acc.push(curr);
  else acc.push(acc[index - 1] + curr);
  return acc;
}, []);
console.log(cumulativeSum.reduce((acc, curr) => acc + curr, 0));
