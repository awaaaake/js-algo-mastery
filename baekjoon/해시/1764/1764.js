const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/class2/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");
input.shift();
const answer = [];
const nameMap = new Map();
for(const name of input) {
    nameMap.get(name) ? answer.push(name) : nameMap.set(name, 1);
}

console.log(answer.length);
answer.sort();
for(let name of answer) {
    console.log(name);
}