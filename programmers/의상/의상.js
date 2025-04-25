function solution(clothes) {
    const clothesCount = {};
    for(let [value, type] of clothes) {
        clothesCount[type] = (clothesCount[type] || 0) + 1;
    }
    let answer = 1;
    for(let cnt of Object.values(clothesCount)) {
        answer *= (cnt+1);//주어진 type의 옷을 입는 경우 그 가짓수(cnt) + 입지않는 경우(1)
    }
    answer -= 1;//모든 type의 옷을 입지않는 경우 빼기(최소 한 개의 의상은 입습니다)
    return answer;
}