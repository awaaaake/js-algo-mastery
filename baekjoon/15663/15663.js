const input = require("fs")
  .readFileSync("./baekjoon/class2/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");
const [[N, M], numArr] = input.map((row) => row.split(" ").map(Number));
numArr.sort((a, b) => a - b);
let result = [];
const answer = new Set();
const checked = new Array(N).fill(false);

const backtracking = (depth) => {
  if (depth === M) {
    answer.add(result.join(" "));
    return;
  }
  for (let i = 0; i < N; i++) {
    if (checked[i]) continue;
    
    result.push(numArr[i]);
    checked[i] = true;
    backtracking(depth + 1);
    result.pop(numArr[i]);
    checked[i] = false;
  }
};

backtracking(0);
for (let seq of [...answer]) {
  console.log(seq);
}
