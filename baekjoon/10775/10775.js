const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const G = input[0];
const P = input[1];
let count = 0;
const planes = input.slice(2);
const parent = Array(G + 1)
  .fill(0)
  .map((_, i) => i);

const find = (x) => {
  //주어진 x번 gate부터 시작해서 도킹할수있는 가장가까운 게이트 parent[x]에대해서 다시 반복
  if (parent[x] === x) return x;
  return (parent[x] = find(parent[x]));
};

for (let i = 0; i < P; i++) {
  let gate = find(planes[i]); //현재 비행기 i가 도킹할 수 있는 가장 가까운 게이트 찾기
  if (gate === 0) break;

  parent[gate] = gate - 1; //gate에 도킹했다고가정하면, 다음 가능한 게이트는 gate-1 (gate부터 순차적으로 1감소)
  count++;
}

console.log(count);
