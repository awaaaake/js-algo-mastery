const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

let [T] = input[0];
let i = 1;
while (T > 0) {
  let pass = 1; //심사등수가 가장 높은 지원자
  const [cnt] = input[i++];
  const ranking = input.slice(i, i + cnt);

  ranking.sort((a, b) => a[0] - b[0]);

  let j = 1;
  let prevHigh = ranking[0][1]; //이전 참가자들중 면접 최고 순위(숫자가 작은것)

  while (j < cnt) {
    const cur = ranking[j++];
    if (cur[1] <= prevHigh) {
      prevHigh = cur[1];
      pass++;
    }
  }
  console.log(pass);
  i += cnt;
  T--;
}
