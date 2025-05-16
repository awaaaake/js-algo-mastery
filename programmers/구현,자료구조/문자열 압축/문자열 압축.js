function solution(s) {
    const result = [];
    for(let cnt=1; cnt<s.length; cnt++) {
        //문자열을 자르는 단위
        let repeat=s.slice(0, cnt);
        let i=cnt;
        let count = 1;//repeat의 반복회수
        let answer ="";
        while(i<s.length) {
            if(s.slice(i, i+cnt) === repeat) {
                count++;
            } else {
                answer += `${count===1 ? "": count}${repeat}`;
                repeat=s.slice(i, i+cnt);
                count=1;
            }
            i+=cnt;
        }
        answer += `${count===1 ? "": count}${repeat}`;
        if(answer!=="") result.push(answer.length);
    }
    return result.length > 0 ? Math.min(...result) : 1;
}