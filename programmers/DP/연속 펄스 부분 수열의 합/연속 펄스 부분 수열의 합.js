function solution(sequence) {
  let cur1 = 0,
    cur2 = 0;
  let answer = -Infinity;

  for (let i = 0; i < sequence.length; i++) {
    //현재 시퀀스값을 두가지 펼스로 나눠서 처리
    let a = i % 2 === 0 ? sequence[i] : -sequence[i]; //[1, -1, 1,...]
    let b = -a; //[-1, 1, -1,...]

    cur1 = Math.max(cur1 + a, a);
    cur2 = Math.max(cur2 + b, b);

    answer = Math.max(cur1, cur2, answer);
  }
  return answer;
}
