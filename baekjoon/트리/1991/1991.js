const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .split("\n")
  .map((line) => line.trim().split(" ")); // 각 줄의 끝에 있는 \r 제거

const N = +input[0];
const tree = {};

//노드, 왼쪽, 오른쪽
for (let [node, left, right] of input.slice(1)) {
  tree[node] = [left === "." ? null : left, right === "." ? null : right];
}

const answer = new Array(3).fill([]);

const preOrder = (node) => {
  if (!node) return;
  answer[0] += node;
  for (let next of tree[node]) preOrder(next);
};

const inOrder = (node) => {
  if (!node) return;
  inOrder(tree[node][0]);
  answer[1] += node;
  inOrder(tree[node][1]);
};

const postOrder = (node) => {
  if (!node) return;
  for (let next of tree[node]) postOrder(next);
  answer[2] += node;
};

preOrder('A');
inOrder('A');
postOrder('A');
console.log(answer.join("\n"));
