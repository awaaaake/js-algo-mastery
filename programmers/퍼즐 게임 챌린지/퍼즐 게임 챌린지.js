function solution(diffs, times, limit) {
    let max = Math.max(...diffs), min=1, mid=undefined;
    let answer = max;
    while(min<=max) {
        mid = Math.floor((max+min)/2);
        let spendTime = 0;//spendTime이 limit을 넘어가는순간 정확히 계산할 필요가x
        for(let i=0; i<diffs.length; i++) {
            spendTime+=times[i];
            if(diffs[i] > mid) {
                spendTime+=(times[i-1]+times[i])*(diffs[i]-mid)
            }
            
            if(spendTime > limit) {
                break;
            }
        }
        
        if(spendTime > limit) {//전체 소요시간을 줄이려면 숙련도가 커져야함
            min = mid + 1;
        } else {
            answer = mid;
            max = mid - 1;
        }
    }
    
    return answer;
}