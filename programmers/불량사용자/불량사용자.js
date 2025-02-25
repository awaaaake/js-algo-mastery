function solution(user_id, banned_id) {
  const n = banned_id.length;
  const cases = new Array(n).fill().map((_) => []); //bid idx별 가능한 uid 후보군들

  banned_id.forEach((bid, idx) => {
    const ids = new Set(); //현재 bid에 매칭되는 uid 후보군들

    for (let uid of user_id) {
      if (uid.length === bid.length) {
        let isSame = true;
        for (let i = 0; i < bid.length; i++) {
          if (!(bid[i] === uid[i] || (bid[i] !== uid[i] && bid[i] === "*"))) {
            isSame = false;
            break;
          }
        }
        if (isSame) ids.add(uid);
      }
    }
    cases[idx].push(...ids);
  });

  //주어진 후보군으로 가능한 모든 경로 찾기
  const results = new Set();

  const dfs = (bid_idx, result, visited) => {
    if (bid_idx === n) {
      if (result.size === n) {
        const sortedResult = [...result].sort().join(",");
        results.add(sortedResult); //선택된 전체 제재아이디를 정렬 후, 하나의 문자열로 합쳐서 Set으로 관리 => 중복 방지
      }
      return;
    }

    for (let i = 0; i < cases[bid_idx].length; i++) {
      const currentUser = cases[bid_idx][i];
      if (!visited.has(currentUser)) {
        visited.add(cases[bid_idx][i]);
        result.add(cases[bid_idx][i]);

        dfs(bid_idx + 1, result, visited);

        result.delete(cases[bid_idx][i]);
        visited.delete(cases[bid_idx][i]);
      }
    }
  };

  dfs(0, new Set(), new Set());
  console.log(results);
  return results.size;
}
