const [N, M] = require("fs")
  .readFileSync("./baekjoon/class2/example.txt", "utf-8")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

let result = [];
//백트래킹 함수
const backtracking = (start, depth) => {
  //start: 탐색을 시작할 숫자, depth: 선택한 수의 개수
  //M개를 다 고르면 그때 출력
  if (depth === M) {
    console.log(result.join(" "));
    return;
  }

  for (let i = start; i <= N; i++) {
    //수열에 숫자 추가
    result.push(i);

    backtracking(i + 1, depth + 1); // 재귀 호출, 현재 선택한 수보다 큰 수만 선택하도록 start는 i + 1로 설정 -> 가지치기

    result.pop(); // 백트래킹: 현재 수를 빼고 다시 다음 경로로 진행
  }
};

backtracking(1, 0);
