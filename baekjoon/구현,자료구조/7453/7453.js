const input = require("fs")
  .readFileSync("./baekjoon/example.txt")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [n] = input.shift();
const A = [],
  B = [],
  C = [],
  D = [];

// 입력을 각 배열 A, B, C, D로 나눔
for (let i = 0; i < n; i++) {
  A.push(input[i][0]);
  B.push(input[i][1]);
  C.push(input[i][2]);
  D.push(input[i][3]);
}

const getSubSum = (arr1, arr2) => {
  const subMap = new Map();

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const sum = arr1[i] + arr2[j];
      subMap.set(sum, (subMap.get(sum) || 0) + 1);
    }
  }

  return subMap;
};

const sub1 = getSubSum(A, B);

let answer = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    const target = -(C[i] + D[j]);
    answer += sub1.get(target) || 0;
  }
}

console.log(answer);
