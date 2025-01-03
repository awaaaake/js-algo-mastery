function solution(users, emoticons) {
    let answer = [0,0];
    let cases = [[]];
    emoticons.forEach(() => {
        const temp = [];
        cases.forEach((c) => {
            [40,30,20,10].forEach(percent => {
                temp.push([...c, percent]);
            }) 
        })
        cases = temp;
    });
    
    cases.forEach((c) => {
        let totalPay = 0, member = 0;
        users.forEach(([rate, price]) => {
            const costPerUser = emoticons.reduce((acc, curr, index) => {
                if(c[index] >= rate) {
                    return acc+curr*(1-c[index]/100);
                }
                return acc;
            },0);
            if(costPerUser >= price) member++;
            else totalPay+=costPerUser;
        })
        if(answer[0] < member || (answer[0] === member && answer[1] < totalPay)) {
            answer=[member, totalPay];
        }
        });
    return answer;
}