function solution(n, info) {
  //dfs
  let result = [0, []];
  const scoreOfAppeach = info.reduce((acc, curr, i) => {
    if (curr === 0) return acc;
    return acc + 10 - i;
  }, 0);

  const dfs = (i, remain, scoreInfo) => {
    if (remain < 0) return;
    if (remain === 0 || i === 0) {
      const scoreDiff = scoreInfo[1] - scoreInfo[0];

      if (scoreDiff >= result[0]) {
        const temp = [...scoreInfo[2]];
        for (let i = 0; i < 10 - scoreInfo[2].length + 1; i++) {
          temp.push(0);
        }
        if (i === 0 && remain > 0) temp[temp.length - 1] = remain;
        let change = true;
        if (scoreDiff === result[0]) {
          for (let i = 10; i >= 0; i--) {
            if(result[1][i] < temp[i]) break;
            if (result[1][i] !== 0 && temp[i] === 0) { //if(result[1][i] > temp[i]) 이게 왜 안되는지 모르겠다..
              //기존 result에서 낮은 점수가 더 많이 나오면
              change = false;
              break;
            }
          }
        }
        if (change) result = [scoreDiff, temp];
      }
      return;
    }

    dfs(i - 1, remain - (info[10 - i] + 1), [
      info[10 - i] === 0 ? scoreInfo[0] : scoreInfo[0] - i,
      scoreInfo[1] + i,
      scoreInfo[2].length === 0
        ? [info[10 - i] + 1]
        : [...scoreInfo[2], info[10 - i] + 1],
    ]);
    dfs(i - 1, remain, [
      scoreInfo[0],
      scoreInfo[1],
      scoreInfo[2].length === 0 ? [0] : [...scoreInfo[2], 0],
    ]);
  };

  dfs(10, n, [scoreOfAppeach, 0, []]); //과녁점수, 남은 화살개수, [어피치점수, 라이언점수, 라이언 기록]
  return result[1].length === 0 ? [-1] : result[1];
}

solution(
  5,
  [2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 2, 0, 1, 0, 0, 0, 0, 0, 0]
);
