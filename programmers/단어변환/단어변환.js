function solution(begin, target, words) {
  const diffIsOne = (str1, str2) => {
    let count = 0;
    for (let j = 0; j < str1.length; j++) {
      if (str2[j] !== str1[j]) count++;
    }
    return count === 1;
  };

  let answer = words.length + 1;

  if (!words.includes(target)) return 0;

  //가장 짧은 변환 과정 : bfs
  const bfs = () => {
    const queue = [[begin, 0]];
    const visited = new Set(); //중복되는 단어는 없으므로

    while (queue.length) {
      const [curr, cnt] = queue.shift();

      if (curr === target) {
        return cnt; //가장빠른 과정이 먼저 도달할것이므로 바로 return;
      }

      for (let i = 0; i < words.length; i++) {
        if (!visited[i] && diffIsOne(curr, words[i])) {
          visited.add(words[i]);
          queue.push([words[i], cnt + 1]);
        }
      }
    }

    return 0;
  };

  return bfs();
}
