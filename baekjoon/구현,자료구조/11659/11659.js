const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/class2/example.txt", "utf-8")
  .trim()
  .split("\n")
  .slice(1);
let [numArr, ...sections] = input;
numArr = numArr.split(" ").map(Number);
sections = sections.map((row) => row.split(" ").map((el) => +el - 1));

const cumulativeSum = numArr.reduce((acc, curr, index) => {
  if (index === 0) acc.push(curr);
  else acc.push(acc[index - 1] + curr);
  return acc;
}, []);

for (let [startIndex, endIndex] of sections) {
  console.log(
    cumulativeSum[endIndex] -
      (startIndex === 0 ? 0 : cumulativeSum[startIndex - 1])
  );
}
