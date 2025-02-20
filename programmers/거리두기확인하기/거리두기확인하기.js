function solution(places) {
  const answer = [];
  for (let place of places) {
    let result = 1;
    const pos = [];
    for (let i = 0; i < place.length; i++) {
      for (let j = 0; j < place[0].length; j++) {
        if (place[i][j] === "P") {
          pos.push([i, j]);
        }
      }
    }

    for (let j = 0; j < pos.length && result === 1; j++) {
      const [x1, y1] = pos[j];
      for (let i = j + 1; i < pos.length; i++) {
        const [x2, y2] = pos[i];
        const dist = Math.abs(x1 - x2) + Math.abs(y1 - y2);
        if (dist === 1) {
          result = 0;
          break;
        } else if (dist === 2) {
          if (x1 === x2 && place[x1][Math.min(y1, y2) + 1] !== "X") {
            //같은 행
            result = 0;
            break;
          } else if (y1 === y2 && place[Math.min(x1, x2) + 1][y1] !== "X") {
            //같은 열
            result = 0;
            break;
          } else if (x1 !== x2 && y1 !== y2) {
            const [stdX, stdY] = [Math.min(x1, x2), Math.min(y1, y2)];
            if (x1 - x2 + y1 - y2 === 0) {
              //오른쪽 대각선
              if (
                place[stdX][stdY] !== "X" ||
                place[stdX + 1][stdY + 1] !== "X"
              ) {
                result = 0;
                break;
              }
            } else {
              if (
                place[stdX][stdY + 1] !== "X" ||
                place[stdX + 1][stdY] !== "X"
              ) {
                result = 0;
                break;
              }
            }
          }
        }
      }
    }

    answer.push(result);
  }

  return answer;
}
