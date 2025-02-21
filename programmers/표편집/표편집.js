const Node = function (index, prevNode) {
  this.index = index;
  this.prev = prevNode;
  this.next;
};

function solution(n, k, cmd) {
  let root = new Node(0);
  let currNode = root;
  let prevNode = root;

  for (let i = 1; i < n; i++) {
    const newNode = new Node(i, prevNode);
    prevNode.next = newNode;
    prevNode = newNode;

    if (i === k) {
      currNode = newNode;
    }
  }

  const checked = new Array(n).fill(true);
  const lastDeleted = [];

  for (let c of cmd) {
    const [char, num] = c.split(" ");
    if (char === "U") {
      let i = 0;
      while (i < Number(num) && currNode.prev) {
        currNode = currNode.prev;
        i++;
      }
    } else if (char === "D") {
      let i = 0;
      while (i < Number(num) && currNode.next) {
        currNode = currNode.next;
        i++;
      }
    } else if (char === "C") {
      lastDeleted.push(currNode);
      const prev = currNode.prev;
      const next = currNode.next;
      if (prev && next) {
        prev.next = next;
        next.prev = prev;
        currNode = next;
      } else if (prev) {
        //마지막 행이면
        prev.next = null;
        currNode = prev;
      } else if (next) {
        //첫번째 행이면
        next.prev = null;
        currNode = next;
      }
    } else if (char === "Z") {
      let lst = lastDeleted.pop();
      const prev = lst.prev;
      const next = lst.next;
      if (prev) {
        prev.next = lst;
      }
      if (next) {
        next.prev = lst;
      }
    }
  }

  let result = new Array(n).fill("O");
  for (let node of lastDeleted) {
    result[node.index] = "X";
  }

  return result.join("");
}
