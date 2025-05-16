const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const angle = parseInt(360 / K);
const dots = input.slice(1).map(Number);
let i = 0;
let answer = N;

const binarySearch = () => {
  let left = 0;
  let right = angle - 1;
  while (left <= right) {
    let cnt = new Array(K).fill(0);
    for (let pos of dots) {
      for (let i = 1; i <= K; i++) {
        const start = left * i;
        if (pos >= start && pos < start + angle) {
          cnt[i - 1]++;
          break;
        }
      }
    }
    answer = Math.min(answer, Math.max(...cnt) - Math.min(...cnt));
    left = dots[i] + 1;
    i++;
  }
};

binarySearch();
console.log(answer);
