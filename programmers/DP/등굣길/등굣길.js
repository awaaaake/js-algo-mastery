function solution(m, n, puddles) {
    const MOD = 1_000_000_007;
    //학교까지 갈 수 있는 최단경로의 개수를 1,000,000,007로 나눈 나머지
    const dp = Array.from({length: m}, () => new Array(n).fill(0));
    //dp[i][j] 0,0에서 i,j까지 가는(1.잠긴지역을 피해서 2.오른쪽/아래로만 움직여서) 경로의 수
    dp[0][0]=1;
    for(let [x,y] of puddles) {
        dp[x-1][y-1]=-1;//갈수없는 위치는 -1으로 설정
    }

    for(let i=0; i<m; i++) {
        for(let j=0; j<n; j++) {
            if(dp[i][j]===-1) {
                dp[i][j]=0;
                continue;
            }
            
            if(i > 0) dp[i][j]+=dp[i-1][j]%MOD;
            if(j > 0) dp[i][j]+=dp[i][j-1]%MOD;
            
            dp[i][j]%=MOD;
        }
    }
    
    return dp[m-1][n-1];
}