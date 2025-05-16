const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [N, M] = input.shift();
const stores = [];
const houses = [];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (input[i][j] === 2) {
      stores.push([i, j]);
    } else if (input[i][j] === 1) {
      houses.push([i, j]);
    }
  }
}

const checked = new Array(stores.length).fill(false);

const getMinDist = () => {
  let sum = 0;
  houses.forEach(([x, y]) => {
    let min = Infinity;
    stores.forEach(([x2, y2], i) => {
      //최소 치킨 거리를 찾는다.
      if (checked[i]) {
        min = Math.min(min, Math.abs(x2 - x) + Math.abs(y2 - y));
      }
    });
    sum += min;
  });

  return sum;
};

const result = [];
const dfs = (prevIndex, depth) => {
  if (depth === M) {
    result.push(getMinDist()); //도시의 치킨 거리 구하기기
    return;
  }

  for (let i = prevIndex; i < stores.length; i++) {
    checked[i] = true;
    dfs(i + 1, depth + 1);
    checked[i] = false;
  }
};

dfs(0, 0);
console.log(Math.min(...result));
