const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .trim()
  .split("\n");

// 소수 판별 및 소수 목록 생성 (에라토스테네스의 체)
const limit = 10 ** 7;
const isPrime = Array(limit + 1).fill(true);
isPrime[0] = isPrime[1] = false;
const prime = [];

for (let i = 2; i <= limit; i++) {
  if (isPrime[i]) {
    prime.push(i);
    for (let j = i * 2; j <= limit; j += i) {
      isPrime[j] = false;
    }
  }
}

// 소수의 합이 될 때까지 슬라이딩
function slidingToPrime(S, s, e) {
  S += prime[e + 1] - prime[s]; //구간합의 크기는 유지하면서
  s++;
  e++;
  while (!isPrime[S]) {
    //구간합이 소수가 될때까지
    S += prime[e + 1] - prime[s];
    s++;
    e++;
  }
  return [S, s, e];
}

function solve(m, N) {
  const result = [];
  for (let n of N) {
    let S = prime.slice(0, n).reduce((a, b) => a + b, 0);
    let s = 0,
      e = n - 1;
    if (isPrime[S]) {
      result.push([S, s, e]);
    } else {
      result.push(slidingToPrime(S, s, e));
    }
  }

  while (true) {
    result.sort((a, b) => a[0] - b[0]); //구간합 정렬
    let allEqual = true; //크기가 ni인 구간합들이 모두 같은지

    for (let i = 0; i < m - 1; i++) {
      if (result[i][0] !== result[i + 1][0]) {
        const [S, s, e] = result.shift();
        result.push(slidingToPrime(S, s, e));
        allEqual = false;
        break;
      }
    }
    if (allEqual) {
      console.log(result[0][0]);
      console.log();
      break;
    }
  }
}

let index = 0;
const T = +input[index++];
for (let i = 1; i <= T; i++) {
  console.log(`Scenario ${i}:`);
  const m = +input[index++];
  const N = input[index++].split(" ").map(Number);
  solve(m, N); //N: ni들의 배열, m: N의 개수
}