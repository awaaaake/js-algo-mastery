const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");

const map = input.map((row) => row.split(" ").map(Number));
const start = map.flat().join("");
const target = "123456780";

const visited = new Set([start]);

const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

const queue = [[start, 0]];
let idx = 0;

while (idx < queue.length) {
  const swap = (str, i, j) => {
    const arr = [...str];
    [arr[i], arr[j]] = [arr[j], arr[i]];
    return arr.join("");
  };

  const [cur, cnt] = queue[idx++];

  if (cur === target) {
    console.log(cnt);
    return;
  }

  const zero = cur.indexOf("0");
  const x = Math.floor(zero / 3);
  const y = zero % 3;

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx < 3 && nx >= 0 && ny < 3 && ny >= 0) {
      const nextIdx = nx * 3 + ny;
      const next = swap(cur, zero, nextIdx);
      if (!visited.has(next)) {
        visited.add(next);
        queue.push([next, cnt + 1]);
      }
    }
  }
}

console.log(-1);