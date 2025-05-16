const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");

const [A, B] = input[0].split(" ").map(Number);

const bfs = () => {
  const queue = [[A, 0]];

  while (queue.length > 0) {
    const [curr, count] = queue.shift();

    for (let val of [curr * 2, +(curr.toString() + "1")]) {
      if (val === B) {
        return count + 1 + 1;
      } else if (val < B) {
        queue.push([val, count + 1]);
      }
    }
  }
  return -1;
};

console.log(bfs());
