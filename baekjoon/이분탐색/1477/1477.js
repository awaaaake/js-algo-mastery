const input = require("fs")
  .readFileSync("./baekjoon/example.txt", "utf-8")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

//부분문자열 길이가 고정 -> 슬라이딩 윈도우
const [N, M, L] = input[0];
const pos = input[1] || [];

//고속도로의 시작으로부터 0 ~ L 까지 거리
pos.push(L);
pos.sort((a, b) => a - b);

//이미있는곳 or 끝 -> 휴게소x
//정수 위치에만
//휴게소가 없는 최대 구간의 길이의 최소로 -> 간격을 좁게
let answer = 0;
let end = L; //휴게소간 최대 간격
let start = 1; //휴게소간 최소 간격

while (start <= end) {
  let mid = Math.floor((start + end) / 2);

  let prev = 0;
  let cnt = 0;

  for (let cur of pos) {
    const gap = cur - prev;

    cnt += Math.floor(gap / mid); //prev~cur까지 mid간격으로 몇개의 나무를 설치해야하는가
    if (gap % mid === 0) cnt -= 1; //cur위치에 설치해야하는 경우는 제거

    prev = cur;
  }

  // console.log(`${mid} 간격으로 ${cnt}개 설치`);
  if (cnt > M) {
    //해당 간격으로 휴게소 설치x -> M보다 더 많이 설치해야함
    start = mid + 1;
  } else {
    //충분히 설치가능 -> 더 많이 설치해서 좁혀야함
    answer = mid;
    end = mid - 1;
  }
}
console.log(answer);
