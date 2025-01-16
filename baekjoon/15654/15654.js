const input = require("fs")
  .readFileSync("./baekjoon/class2/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");
const [[N, M], [...numArr]] = input.map((row) => row.split(" ").map(Number));
numArr.sort((a, b) => a - b);
const result = [];
const used = new Array(N).fill(false);

const dfs = (depth) => {
  if (depth === M) {
    console.log(result.join(" "));
    return;
  }

  for (let i = 0; i < N; i++) {
    //start기준 그 다음 수부터 순회x -> 이미 사용된 숫자들을 제외한 모든 수들을 순회
    if (used[i]) continue;

    result.push(numArr[i]);
    used[i] = true;
    backtracking(depth + 1);
    result.pop();
    used[i] = false;
  }
};

dfs(0);
