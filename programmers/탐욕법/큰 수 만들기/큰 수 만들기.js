function solution(number, k) {
  const stack = []; //큰수를 담는 스택

  for (let num of number) {
    //각 num를 순회하며
    //증가하는 구간의 앞선 숫자들을 제거하고, 현재의 더 큰수를 추가
    while (k > 0 && stack.length > 0 && num > stack.at(-1)) {
      stack.pop();
      k--;
    }
    stack.push(num);
  }

  stack.slice(0, stack.length - k).join("");
}
