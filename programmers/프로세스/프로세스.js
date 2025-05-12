function solution(priorities, location) {
  priorities = priorities.map((val, i) => [val, i]);
  let count = 0;

  while (priorities.length) {
    const [curr, i] = priorities.shift();
    let executable = true;
    for (let [next, j] of priorities) {
      if (next > curr) {
        executable = false;
        break;
      }
    }
    if (!executable) {
      priorities.push([curr, i]);
      continue;
    }
    count++;
    if (i === location) return count;
  }
}
