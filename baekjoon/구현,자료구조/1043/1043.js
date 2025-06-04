const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [N, M] = input.shift();
const [k, ...arr] = input.shift(); //k: 진실을 아는 사람들의 수, arr: 진실을 아는 사람들의 번호가 담긴 배열열
const tOrF = new Array(N + 1).fill(false);
const trues = [];
const adjList = new Array(N + 1).fill().map(() => []);
for (let p of arr) {
  tOrF[p] = true;
  trues.push(p);
}

for (let [num, ...people] of input) {
  for (let i = 0; i < num; i++) {
    const currP = people[i];
    const remain = [...people.slice(0, i), ...people.slice(i + 1)];
    adjList[currP].push(...remain);
  }
}

let index = 0;
while (index < trues.length) {
  const p = trues[index];

  for (let nP of adjList[p]) {
    if (!tOrF[nP]) {
      tOrF[nP] = true;
      trues.push(nP);
    }
  }

  index++;
}

let count = 0;

//num: 각 파티마다 오는 사람의 수, people: 각 파티마다 오는 사람들의 번호가 담긴 배열
for (let [num, ...people] of input) {
  let result = people.every((el) => !tOrF[el]); //모두 과장을 이야기해도 되는 사람들인 경우우
  if (result) count++;
}

console.log(count);
