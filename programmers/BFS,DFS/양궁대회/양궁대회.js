function solution(n, info) {
    //라이언은 어피치를 가장 큰 점수 차이로 이기기 위해서 
    //n발의 화살을 어떤 과녁 점수에 맞혀야 하는지    
    const counted = new Array(11).fill(0);//라이언의 [10점 개수, 9점 개수, 8점 개수, .... , 0점 개수];
    let max = [0, [-1]];

    const dfs = (used, start) => {
        if(used < 0) {
            return;
        }
        
        if(start === 11) {
            if(used > 0) counted[10] += used;
            let lionSc = 0, ApeachSc = 0;
            
            for(let i=0; i<=10; i++) {
                const cntOfLion = counted[i];
                const cntOfAppeach = info[i];
                
                if(cntOfLion === 0 && cntOfAppeach === 0) {
                    continue;
                } else if(cntOfLion > cntOfAppeach) {
                    lionSc += (10-i);
                } else if(cntOfAppeach >= cntOfLion) {
                    //a = b일 경우는 어피치가 k점을 가져갑니다.
                    ApeachSc += (10-i);
                }
            }
            
            const diff = lionSc - ApeachSc;
            if(diff > 0) {
                if(diff === max[0]) {
                    for(let i=10; i>=0; i--) {
                        if(counted[i] > max[1][i]) {
                            max[1] = [...counted];
                            break;
                        } else if (counted[i] < max[1][i]) {
                            break;
                        }
                    }
                }
                
                if(diff > max[0]) {
                    max = [diff, [...counted]];
                }
            } 
            
            return;
        }
        
        for(let i=start; i<11; i++) {    
            //라이언이 승리하는 경우
            counted[i] = (i===n ? used : (info[i] + 1));
            dfs(used - counted[i], i+1);
            
            //어피치가 승리하거나 동점인 경우
            counted[i] = 0;
            dfs(used, i+1);
        }
    }
    
    dfs(n, 0);
    return max[1];
}