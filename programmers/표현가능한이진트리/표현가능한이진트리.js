function solution(numbers) {
  const checkBTree = (bi_tree, start, end) => {
    const mid = Math.floor((start + end) / 2);
    const left = Math.floor((start + mid - 1) / 2);
    const right = Math.floor((mid + 1 + end) / 2);

    if (start == end) return true;

    //부모가 0인데 자식이 1이면 이진트리 불가
    if (
      bi_tree[mid] === "0" &&
      (bi_tree[left] === "1" || bi_tree[right] === "1")
    )
      return false;

    if (!checkBTree(bi_tree, start, mid - 1)) return false;
    if (!checkBTree(bi_tree, mid + 1, end)) return false;

    return true;
  };

  const answer = [];
  //더미노드: 0, 노드: 1
  for (let num of numbers) {
    const binary = num.toString(2);
    const n = binary.length;
    //이진트리를 만들기위한 노드 개수
    const m = n.toString(2).length;
    let bi_tree = "0".repeat(2 ** m - 1 - n); //부족한 부분 0채우기
    bi_tree += binary;
    answer.push(checkBTree(bi_tree, 0, bi_tree.length - 1) ? 1 : 0);
  }

  return answer;
}
