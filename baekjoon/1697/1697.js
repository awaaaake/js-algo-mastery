const [N, K] = require("fs")
  .readFileSync("./baekjoon/class2/example.txt", "utf-8")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const bfs = (start, time) => {
  const visited = Array(100001).fill(false); // 방문 배열 생성
  const queue = [[start, time]]; //탐색을 시작할 노드를 큐에 넣음

  while (queue.length > 0) {
    let [currPos, time] = queue.shift(); //큐에서 노드하나꺼냄

    if (currPos === K) {
      console.log(time); //먼저 도착한 경우의 time이 출력되겠지 -> 최단경로
      break;
    }

    if (!visited[currPos]) {
      time++;
      visited[currPos] = true;
      for (let nexPos of [currPos - 1, currPos + 1, currPos * 2]) {
        if (nexPos >= 0 && nexPos <= 100000 && !visited[nexPos])
          queue.push([nexPos, time]);
      }
    }
  }
};

bfs(N, 0);
