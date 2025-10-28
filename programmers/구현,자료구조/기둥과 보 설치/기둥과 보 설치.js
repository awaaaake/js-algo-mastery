function solution(n, build_frame) {
  //규칙을 만족하지않는 작업은 무시
  //기둥은 바닥 위에 있거나 보의 한쪽 끝 부분 위에 있거나, 또는 다른 기둥 위에 있어야 합니다.
  //보는 한쪽 끝 부분이 기둥 위에 있거나, 또는 양쪽 끝 부분이 다른 보와 동시에 연결되어 있어야 합니다.
  const board = Array.from({ length: n + 1 }, () =>
    Array.from({ length: n + 1 }, () => new Array(2).fill(false))
  );
  //board[x][y] = [-1, -1]; 기둥 여부, 보 여부
  //a 기둥 0, 보 1
  //b 삭제 0, 설치 1

  const isSatisfied = (x, y, type) => {
    //보
    if (type === 1) {
      return (
        board[x][y - 1]?.[0] || //왼쪽 아래 기둥
        board[x + 1]?.[y - 1]?.[0] || //오른쪽 아래 기둥
        (board[x + 1]?.[y][1] && board[x - 1]?.[y][1]) // 왼쪽 오른 쪽 모두 보
      );
    }

    //기둥
    if (type === 0) {
      return (
        y === 0 || //바닥 위
        board[x][y][1] || //보의 오른쪽 위
        board[x - 1]?.[y][1] || //보의 왼쪽 위
        board[x][y - 1]?.[0] //다른 기둥위
      );
    }
  };

  for (let [x, y, a, b] of build_frame) {
    if (b === 0) {
      //임시 삭제
      board[x][y][a] = false;
      let valid = true;

      for (let i = 0; i <= n; i++) {
        for (let j = 0; j <= n; j++) {
          if (
            (board[i][j][0] && !isSatisfied(i, j, 0)) ||
            (board[i][j][1] && !isSatisfied(i, j, 1))
          ) {
            valid = false;
            break;
          }
        }
        if (!valid) break;
      }

      if (!valid) board[x][y][a] = true; //복구
    }

    if (b === 1) {
      if (isSatisfied(x, y, a)) {
        board[x][y][a] = true;
      }
    }
  }

  const result = [];
  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= n; j++) {
      if (board[i][j][0]) result.push([i, j, 0]);
      if (board[i][j][1]) result.push([i, j, 1]);
    }
  }

  result.sort((a, b) => {
    if (a[0] === b[0]) {
      if (a[1] === b[1]) {
        //기둥 -> 보 (오름차순 정렬)
        return a[2] - b[2];
      }
      return a[1] - b[1];
    }
    return a[0] - b[0];
  });

  return result;
}
