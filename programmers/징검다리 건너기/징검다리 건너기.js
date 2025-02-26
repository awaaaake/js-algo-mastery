function solution(stones, k) {
  let left = 1;
  let right = 200000000; //징검다리를 건널 수 있는 최대 인원
  let answer = 0;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let zeros = 0; //연속된 0의 개수
    let isPossible = true;

    for (let st of stones) {
      //가능 여부를 한 사람이 건너뛴, 그 다음 징검다리 상태에서부터 판별함
      if (st - mid <= 0) {
        //mid만큼 건너뛰었다고 생각하고 판별 -> mid+1명도 가능한가를 판별
        zeros++;
        if (zeros >= k) {
          isPossible = false;
          break;
        }
      } else {
        zeros = 0;
      }
    }

    if (isPossible) {
      answer = Math.max(mid + 1, answer); //+1: 맨처음 한명이 건너는 경우를 포함
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return answer;
}
