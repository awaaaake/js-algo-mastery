function solution(board) {
    let answer = Infinity;
    const n = board.length;
    const dp = Array.from({length: n}, () => Array.from({length: n}, () => new Array(4).fill(Infinity)));
    const directions = [[-1,0],[1,0],[0,-1],[0,1]];
    
    const bfs = () => {
        const queue = [[0,0, -1, 0]];//현재좌표, 이전방향, 비용
        
        for(let i=0; i<4; i++) {
            dp[0][0][i]=0;
        }
        
        while(queue.length>0) {
            const [x, y, prevDir, cost] = queue.shift();
            
            if(x===n-1 && y===n-1) {//도착지에 도달했더라도, 비용이 더 작은 경우가 나올 수 있음(바로 리턴 금지)
                answer = Math.min(answer, cost);
                continue;
            }
            
            for(let i=0; i<4; i++) {
                const [dx,dy]=directions[i];
                const nx=x+dx;
                const ny=y+dy;
                
                if(nx>=0 && nx<n && ny>=0 && ny<n && board[nx][ny]===0) {
                    const isCorner = !(prevDir===-1 || prevDir===i);
                    const nextCost = cost + (isCorner? 600 : 100);
                    if(nextCost < dp[nx][ny][i]) {//같은 방향의 dp값과만 비교해야함
                        dp[nx][ny][i]=nextCost;
                        queue.push([nx, ny, i, nextCost]);
                    }
                }
            }
        }
    }
    
    bfs();
    return answer;
}