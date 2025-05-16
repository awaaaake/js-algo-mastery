const fs = require("fs");
const input = fs
  .readFileSync("./baekjoon/class2/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((line) => line.trim()); // 각 줄의 끝에 있는 \r 제거

const N = +input.shift();
const Tree = input.map((row) => row.split(" "));

//각 노드의 왼쪽, 오른쪽 자식을 map구조로 저장
const treeMap = new Map();
for (let [node, left, right] of Tree) {
  if (!treeMap.has(node)) {
    treeMap.set(node, [left, right]);
  }
}

const answer = new Array(3).fill([]);
//type 0:전위, 1:중위, 2:후위 순회
const dfs = (currNode, type) => {
  if (currNode === ".") {
    return;
  }
  if (type === 0) {
    answer[0] = [...answer[0], currNode];
    dfs(treeMap.get(currNode)[0], type); //왼쪽자식 순회
    dfs(treeMap.get(currNode)[1], type); //오른쪽 자식 순회
  } else if (type === 1) {
    dfs(treeMap.get(currNode)[0], type);
    answer[1] = [...answer[1], currNode];
    dfs(treeMap.get(currNode)[1], type);
  } else {
    dfs(treeMap.get(currNode)[0], type);
    dfs(treeMap.get(currNode)[1], type);
    answer[2] = [...answer[2], currNode];
  }
};

dfs("A", 0);
dfs("A", 1);
dfs("A", 2);
for (let result of answer) {
  console.log(result.join(""));
}
