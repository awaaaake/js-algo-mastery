function sort(array) {
  return array.sort((a, b) => a.length - b.length || a.localeCompare(b));
}

//입력받는 부분
const fs = require('fs');
const input = fs.readFileSync('./baekjoon/class2/example.txt', 'utf-8').toString().trim().split('\n');
input.shift();//첫번째줄 제거
const sortedArray = sort([...new Set(input)]);//중복제거후 정렬
for (let word of sortedArray) {
  console.log(word);
}
