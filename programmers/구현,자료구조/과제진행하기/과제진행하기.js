function solution(plans) {
  const queue = plans
    .map((plan) => {
      //처리해야할 모든 과제들
      const [name, time, spend] = plan;
      const [hour, minute] = time.split(":");
      const convertedTime = Number(hour) * 60 + Number(minute); //시간과 분을 합쳐서 처리
      return [name, convertedTime, Number(spend)];
    })
    .sort((a, b) => a[1] - b[1]); //과제시작 시간이 빠른것부터

  const result = []; //끝낸 과제들
  const first = queue.shift();
  let currTime = first[1];

  const stack = [first]; //멈춰둔 과제들

  while (queue.length) {
    const target = queue.shift();
    const [n_name, n_time, n_spend] = target;
    let timeDiff = n_time - currTime;
    currTime = n_time;

    while (stack.length && timeDiff > 0) {
      const latestPlan = stack.pop(); //가장 최근에 멈춘 과제를 꺼낸다
      const [l_name, l_time, l_spend] = latestPlan;

      if (l_spend <= timeDiff) {
        //시간 순서상 다음 과제를 시작하기전에 끝낼수있다면
        result.push(l_name);
        timeDiff -= l_spend; //해당 과제를 처리하고 남은시간을 계산
      } else {
        latestPlan[2] = l_spend - timeDiff; //다음 과제까지의 시간차이만큼 멈춰둔 과제에 소요하고
        timeDiff = 0;
        stack.push(latestPlan); //다시 stack에 추가
      }
    }

    stack.push(target); //일단 스택에 추가하고, 다음 과제 순서에서 이전 과제를 처리
  }

  while (stack.length) {
    result.push(stack.pop()[0]);
  }

  return result;
}
