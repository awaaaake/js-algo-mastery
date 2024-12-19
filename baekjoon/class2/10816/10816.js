const fs = require('fs');
const lines = fs.readFileSync("./baekjoon/class2/example.txt", "utf-8").toString().trim().split('\n');
let answer=[];
const arrM = lines[1].split(' ').map(Number);
const arrN = lines[3].split(' ').map(Number);

const countMap = {};
for(let val of arrM) {
    countMap[val] ? countMap[val]+=1 : countMap[val]=1;
}

for(let val of arrN) {
    answer.push(countMap[val] || 0);
}

answer = answer.join(' ');
console.log(answer)