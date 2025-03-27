const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [N] = input[0];
const arr = input[1];

const binarySearch = (lis, target) => {
  let left = 0,
    right = lis.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (lis[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return left;
};

const findLISLength = () => {
  const lis = [];
  for (let val of arr) {
    const pos = binarySearch(lis, val);
    if (pos === lis.length) {
      lis.push(val); //num가 LIS 배열의 가장 큰 값보다 크면 배열에 추가
    } else {
      lis[pos] = val; //LIS의 적절한 위치에 값을 덮어씀
    }
  }
  return lis.length;
};

console.log(findLISLength());
