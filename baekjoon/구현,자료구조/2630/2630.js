const input = require("fs")
  .readFileSync("./baekjoon/class2/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n");

const N = +input.shift();
const paper = input.map((row) => row.split(" ").map(Number));
let whiteCount = 0;
let blueCount = 0;

//주어진 영역이 모두 같은 색인지 확인하는 함수
const isSameColor = (x, y, N, color) => {
  for (let i = x; i < x + N; i++) {
    for (let j = y; j < y + N; j++) {
      if (paper[i][j] !== color) return false;
    }
  }
  return true;
};

const getCount = (x, y, N) => {
  if (isSameColor(x, y, N, 0)) {
    whiteCount++;
  } else if (isSameColor(x, y, N, 1)) {
    blueCount++;
  } else {
    const halfSize = parseInt(N / 2);
    getCount(x, y, halfSize);
    getCount(x + halfSize, y, halfSize);
    getCount(x, y + halfSize, halfSize);
    getCount(x + halfSize, y + halfSize, halfSize);
  }
};

getCount(0, 0, N);
console.log(whiteCount);
console.log(blueCount);

// const input = require("fs")
//   .readFileSync("./baekjoon/class2/example.txt", "utf-8")
//   .toString()
//   .trim()
//   .split("\n");

// input.shift();
// const paper = input.map((row) => row.split(" ").map(Number));
// let whiteCount = 0;
// let blueCount = 0;

// //주어진 영역이 모두 같은 색인지 확인하는 함수
// const isSameColor = (grid, color) =>
//   grid.every((row) => row.every((val) => val === color));

// //주어진 그리드를 4개의 하위 그리드로 분할하는 함수
// const splitGrid = (grid, halfSize) => {
//   return [
//     grid.slice(0, halfSize).map((row) => row.slice(0, halfSize)),
//     grid.slice(halfSize).map((row) => row.slice(0, halfSize)),
//     grid.slice(0, halfSize).map((row) => row.slice(halfSize)),
//     grid.slice(halfSize).map((row) => row.slice(halfSize)),
//   ];
// };

// const getCount = (grid) => {
//   //기준이 되는 그리드 : grid
//   const N = grid.length;
//   if (isSameColor(grid, 0)) {
//     whiteCount++;
//   } else if (isSameColor(grid, 1)) {
//     blueCount++;
//   } else {
//     const halfSize = parseInt(N / 2);
//     const [topLeft, bottomButtom, topRight, bottomRight] = splitGrid(
//       grid,
//       halfSize
//     );
//     getCount(topLeft);
//     getCount(bottomButtom);
//     getCount(topRight);
//     getCount(bottomRight);
//   }
// };

// getCount(paper);
// console.log(whiteCount);
// console.log(blueCount);
