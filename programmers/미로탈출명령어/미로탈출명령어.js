function solution(n, m, x, y, r, c, k) {
  const answer = [];
  const cmds = [
    [1, 0], // down
    [0, -1], // left
    [0, 1], // right
    [-1, 0], // up
  ];
  const cmdChars = ["d", "l", "r", "u"];
  let curX = x;
  let curY = y;
  let remainK = k;

  let canComplete = true;

  while (remainK > 0 && canComplete) {
    console.log(curX, curY);
    canComplete = false;

    for (let i = 0; i < cmds.length; i++) {
      //사전순으로 빠른 방향부터 최대한 간다
      const cmd = cmds[i];
      const cmdChar = cmdChars[i];

      const nextX = curX + cmd[0];
      const nextY = curY + cmd[1];

      if (nextX >= 1 && nextX <= n && nextY >= 1 && nextY <= m) {
        let dist = Math.abs(nextX - r) + Math.abs(nextY - c);

        if (remainK > 1) {
          dist += 1; //cur -> next 로 한칸 이동
        }

        if (remainK >= dist) {
          remainK -= 1; //cur -> next로 한칸 이동한것만큼 남은 거리k를 게산
          curX = nextX;
          curY = nextY;
          answer.push(cmdChar);
          canComplete = true;
          break;
        }
      }
    }
  }

  if (curX === r && curY === c) {
    return answer.join("");
  } else {
    return "impossible";
  }
}
