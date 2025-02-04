function solution(picks, minerals) {
  //각 곡괭이당 5개까지 캘수있음, 연속으로 캐야함
  const 피로도 = {
    0: [1, 1, 1],
    1: [5, 1, 1],
    2: [25, 5, 1],
  };

  const index = {
    diamond: 0,
    iron: 1,
    stone: 2,
  };
  const result = [];

  const dfs = (remain, total, start) => {
    if (start >= minerals.length || remain.every((el) => el === 0)) {
      result.push(total);
      return;
    }

    if (remain[0] >= 1) {
      let nextTotal = total;
      let i;
      for (i = start; i < start + 5 && i < minerals.length; i++) {
        nextTotal += 피로도[0][index[minerals[i]]];
      }
      dfs([remain[0] - 1, remain[1], remain[2]], nextTotal, i);
    }
    if (remain[1] >= 1) {
      let nextTotal = total;
      let i;
      for (i = start; i < start + 5 && i < minerals.length; i++) {
        nextTotal += 피로도[1][index[minerals[i]]];
      }

      dfs([remain[0], remain[1] - 1, remain[2]], nextTotal, i);
    }
    if (remain[2] >= 1) {
      let nextTotal = total;
      let i;
      for (i = start; i < start + 5 && i < minerals.length; i++) {
        nextTotal += 피로도[2][index[minerals[i]]];
      }
      dfs([remain[0], remain[1], remain[2] - 1], nextTotal, i);
    }
  };

  dfs(picks, 0, 0);
  return Math.min(...result);
}
