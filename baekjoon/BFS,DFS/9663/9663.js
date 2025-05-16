const N = +require("fs")
  .readFileSync("./baekjoon/class2/example.txt", "utf-8")
  .toString()
  .trim();

let answer = 0;
const cols = new Array(N).fill(false); //열 체크
const d1 = new Array(2 * N).fill(false);
const d2 = new Array(2 * N).fill(false);

const backtracking = (row) => {
  if (row === N) {
    answer++;
    return;
  }
  for (let col = 0; col < N; col++) {
    if (!cols[col] && !d1[row + col] && !d2[row - col + N]) {
      cols[col] = d1[row + col] = d2[row - col + N] = true;
      backtracking(row + 1);//주어진 row의 특정 컬럼에 배치할수있다면, 그 다음행 백트래킹
      cols[col] = d1[row + col] = d2[row - col + N] = false;
    }
  }
};

backtracking(0);
console.log(answer);
