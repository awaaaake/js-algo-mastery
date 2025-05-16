function solution(targets) {
  // 미사일의 끝나는 시점을 기준으로 오름차순 정렬
  targets.sort((a, b) => a[1] - b[1]);
  //현재의 요격 위치에서 최대한 많은 폭격미사일을 처리해야한다.

  let answer = 0;
  let lastShot = -1; // 마지막 요격 위치

  targets.forEach(([start, end]) => {
    // 현재 미사일이 마지막 요격 위치 이후에 시작한다면 새로운 요격이 필요
    if (start >= lastShot) {
      answer++; // 요격 횟수 증가
      lastShot = end; // 요격 위치를 현재 미사일의 끝으로 갱신
    }
  });

  return answer;
}
