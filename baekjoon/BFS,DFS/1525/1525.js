const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");

const map = input.map((row) => row.split(" ").map(Number));
const start = map.flat().join("");
const target = "123456780";

const visited = new Set([start]);

//주어진 입력 -> 1,2,3,4,5,6,7,8,0로 배열
//최소 이동횟수 -> bfs

const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

const queue = [[start, 0]];
let index = 0;

while (index < queue.length) {
  const [cur, cnt] = queue[index++];

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

    if (nx < 0 || nx >= 3 || ny < 0 || ny >= 3) continue;

    const nextIdx = nx * 3 + ny;
    const arr = cur.split("");
    [arr[zero], arr[nextIdx]] = [arr[nextIdx], arr[zero]];
    const next = arr.join("");

    if (!visited.has(next)) {
      visited.add(next);
      queue.push([next, cnt + 1]);
    }
  }
}
console.log(-1);
