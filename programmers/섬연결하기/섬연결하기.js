function solution(n, costs) {
    const parent = new Array(n).fill().map((_,i) => i);
    
    const find=(x) => {
        if(parent[x]===x) return x;
        return parent[x]=find(parent[x]);
    }
    
    const union = (a,b) => {
        let rootA = find(a);
        let rootB = find(b);
        if(rootA !== rootB) {
            a < b ? parent[rootB] = rootA : parent[rootA] = rootB;
        }
    }
    
    let answer = 0;
    let count = 0;//
    costs.sort((a,b) => a[2]-b[2]);//간선비용을 기준으로 정렬
    
    for(let [a,b,cost] of costs) {
        if(find(a)!==find(b)) {
            union(a,b);
            answer+=cost;
            count++;
            if(count===n-1) break;
        }
        
    }
    
    return answer;
}