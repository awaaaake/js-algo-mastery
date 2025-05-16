const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [N] = input[0];
let A = input[1];
const [M] = input[2];
let B = input[3];

// 공통 원소 찾기
const commonElements = [...new Set(A)].filter(x => B.includes(x)).sort((a, b) => b - a);

let result = [];
let posA = 0, posB = 0;

for (const element of commonElements) {
    // A에서 element의 위치 찾기
    while (posA < A.length && A[posA] !== element) posA++;
    // B에서 element의 위치 찾기
    while (posB < B.length && B[posB] !== element) posB++;

    if (posA < A.length && posB < B.length) {
        result.push(element);
        posA++;
        posB++;
    }
}

if (result.length) {
  console.log(result.length + "\n" + result.join(" "));
} else {
  console.log(0);
}

// const count2 = new Map();
// for (let val of arr2) {
//   count2.set(val, (count2.get(val) || 0) + 1);
// }
// const common = [];
// for (let val of arr1) {
//   if (count2.has(val)) {
//     common.push(val);
//     const temp = count2.get(val);
//     temp > 1 ? count2.set(val, temp - 1) : count2.delete(val);
//   }
// }
// common.sort((a, b) => b - a); //내림차순 정렬
// console.log(common);
// let idx = 0;
// const answer = [];
// for (let val of arr1) {
//   if (idx >= common.length) break;
//   if (val === common[idx]) {
//     idx++;
//     answer.push(val);
//   }
// }
// console.log(answer.length + "\n" + answer.join(" "));

