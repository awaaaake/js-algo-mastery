function solution(queue1, queue2) {
  let sum1 = queue1.reduce((acc, el) => acc + el, 0);
  let sum2 = queue2.reduce((acc, el) => acc + el, 0);
  const half = (sum1 + sum2) / 2;
  let q1P = 0;
  let q2P = queue1.length;
  const q = [...queue1, ...queue2];

  for (let cnt = 0; cnt < queue1.length * 3; cnt++) {
    if (sum1 === half) {
      return cnt;
    }
    //++ 그 줄의 코드가 실행되고나서 +됨
    sum1 > half ? (sum1 -= q[q1P++ % q.length]) : (sum1 += q[q2P++ % q.length]);
    console.log(sum1)
  }

  return -1;
}

console.log(solution([1, 2, 1, 2], [1, 10, 1, 2]));
