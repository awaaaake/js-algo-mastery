const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map(Number);
const tree = new Map();

const insertNode = (root, value) => {
  const [left, right] = tree.get(root);

  if (value < root) {
    if (left === null) {
      //왼쪽자식
      tree.get(root)[0] = value;
      tree.set(value, [null, null]);//자식으로 설명하면서, 그 자식을 트리의 새로운 노드로 설정
    } else {
      //이미 왼쪽자식이 있다면
      insertNode(left, value); //왼쪽자식의 자식으로 삽입
    }
  } else {
    if (right === null) {
      tree.get(root)[1] = value;
      tree.set(value, [null, null]);
    } else {
      insertNode(right, value);
    }
  }
};

// 트리에 첫 번째 값을 루트로 설정 -> 트리의 요소가 한개일수도있음
tree.set(input[0], [null, null]);

for (let i = 1; i < input.length; i++) {
  insertNode(input[0], input[i]);
}

//후위 순회
let start = input[0];

const postOrder = (node) => {
  const [left, right] = tree.get(node);
  if (left !== null) postOrder(left);
  if (right !== null) postOrder(right);
  console.log(node);
};
// console.log(tree);
postOrder(start);
