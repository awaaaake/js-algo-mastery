### 이분 탐색에서 while (left < right)와 while (left <= right) 중 어떤 조건을 써야할까?

1. while (left <= right) : 닫힌 구간 [left, right]<br/>
- 기본적인 이분탐색에서 가장 흔히 사용<br/>
- **정확한 값**을 찾을 때<br/>
- 보통 answer 저장

2. while (left < right) : 열린 구간 [left, right) 또는 [left, right]에서 mid 제외<br/>
- Lower bound(최솟값 찾기) 문제에서 자주 사용<br/>
- 탐색 종료후 left가 정답이 되는 구조<br/>
- **조건을 만족하는 최솟값/최댓값** 찾기(lower/upper bound)

<정리>
- 특정 값이 배열에 있는지 → left <= right<br/>
- 최소 몇 이상이면 조건을 만족하는가? -> left < right<br/>