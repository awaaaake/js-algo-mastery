const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);
let answer = [Infinity, 0]; //걸린 시간, count
const maxPos = 100000; // 문제에서 주어진 최대 위치
const visited = Array(maxPos + 1).fill(Infinity); // 방문한 위치와 시간을 저장

const bfs = () => {
  const queue = [[0, N]];
  let index = 0;
  visited[N] = 0;

  while (index < queue.length) {
    const [time, currPos] = queue[index++];

    if (currPos === K) {
      if (answer[0] > time) {
        answer = [time, 1];
      } else if (answer[0] === time) {
        answer[1] += 1;
      }
      continue;
    }

    const nextPositions = [currPos * 2, currPos - 1, currPos + 1];
    for (let nextPos of nextPositions) {
      if (nextPos >= 0 && nextPos <= maxPos && visited[nextPos] >= time + 1) {
        //똑같은 곳을 방문했더라도 시간이 더 짧은 경우
        visited[nextPos] = time + 1;
        queue.push([time + 1, nextPos]);
      }
    }
  }
};

bfs();
console.log(answer[0]);
console.log(answer[1]);
