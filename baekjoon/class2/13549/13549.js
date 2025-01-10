const input = require("fs")
  .readFileSync("./baekjoon/class2/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);

const bfs = () => {
  const queue = [[N, 0]];
  const visited = new Array(100001).fill(false);
  visited[N] = true;

  while (queue.length > 0) {
    const [pos, time] = queue.shift();

    if (pos === K) {
      console.log(time);
      break;
    }

    for (let next of [pos * 2, pos - 1, pos + 1]) {
      if (next < 0 || next > 100000 || visited[next]) continue;

      if (next === pos * 2) {
        queue.unshift([next, time]);
      } else {
        queue.push([next, time + 1]);
      }
      visited[next] = true;
    }
  }
};

bfs();
