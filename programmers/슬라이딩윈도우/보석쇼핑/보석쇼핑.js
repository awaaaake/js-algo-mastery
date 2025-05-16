function solution(gems) {
  const n = new Set(gems).size;
  let minRange = [1, gems.length]; //구간의 최대 길이로 설정하고 줄여나가야함함
  let left = 0,
    right = 0;
  const gemMap = new Map();

  //첫 번째 보석 추가
  gemMap.set(gems[0], 1);

  while (right < gems.length) {
    //모든 종류의 보석을 다 포함하면
    if (gemMap.size === n) {
      //구간의 길이가 최소인지 확인인
      if (minRange[1] - minRange[0] > right - left) {
        minRange = [left + 1, right + 1];
      }
      gemMap.set(gems[left], gemMap.get(gems[left]) - 1);//줄일 때, 이미 gems[left]는 gemMap에 포함된 보석들임
      if (gemMap.get(gems[left]) === 0) {
        gemMap.delete(gems[left]);
      }
      left++;
    } else {
      right++;
      if (right < gems.length) {//범위 확인
        gemMap.set(gems[right], (gemMap.get(gems[right]) || 0) + 1); //단축평가
      }
    }
  }
  return minRange;
}
