function solution(want, number, discount) {
  function isMatch(cnt) {
    //현재 윈도우의 cnt를 want와 비교해서 성공했는지 여부 : (원하는 제품의 수량만큼 할인 받을수있는가)
    for (let i = 0; i < want.length; i++) {
      if (!cnt[want[i]] || cnt[want[i]] < number[i]) {
        return false;
      }
    }
    return true;
  }

  //슬라이딩 윈도우
  let cnt = {};
  for (let target of discount.slice(0, 10)) {
    cnt[target] = (cnt[target] || 0) + 1;//cnt[target]가 undefined면 0으로 설정, 기존값 불러오기
  }

  let answer = 0;
  if (isMatch(cnt)) answer++;

  for (let i = 10; i < discount.length; i++) {
    const add = discount[i];
    const sub = discount[i - 10];
    cnt[add] = (cnt[add] || 0) + 1;
    cnt[sub] -= 1;

    if (isMatch(cnt)) answer++;
  }
  return answer;
}
