function solution(N, number) {
  if (N === number) return 1;

  const dp = Array.from({ length: 9 }, () => new Set());

  for (let i = 1; i < 8; i++) {
    //최대 8개까지 쓸수있음
    dp[i].add(Number(String(N).repeat(i))); //5,55,555,5555,55555...

    for (let j = 1; j < i; j++) {
      for (const op1 of dp[j]) {
        for (const op2 of dp[i - j]) {
          //op1과 op2에서 숫자N의 사용횟수는 합치면 i이다.
          //op2 - op1, op2/op1 은 j가 증가함에 따라 뒤에 계산될것임
          dp[i].add(op1 + op2);
          dp[i].add(op1 - op2);
          dp[i].add(op1 * op2);
          if (op2 != 0) dp[i].add(Math.floor(op1 / op2));
        }
      }
    }
    if (dp[i].has(number)) return i; //현재의 i가 N을 이용해 number를 만드는 가장 적은횟수
  }

  return -1;
}
