function solution(tickets) {
  const graph = new Map();

  for (const [s, e] of tickets) {
    if (!graph.has(s)) {
      graph.set(s, []);
    }
    graph.get(s).push(e);
  }

  for (let [ap, arr] of graph) {
    arr.sort().reverse(); //각 공항의 목적지 공항을 사전순의 역순으로 정렬 -> pop했을 때 사전순으로
  }

  const stack = ["ICN"];
  const route = [];

  while (stack.length) {
    const currAp = stack[stack.length - 1];

    const nextList = graph.get(currAp);
    if (nextList && nextList.length) {
      //현재 Ap의 nextList가 존재하고, 그 배열(다음 목적지들)이 0보다 크다면
      stack.push(nextList.pop());
    } else {
      route.push(stack.pop());
    }
  }

  return route.reverse();
}
