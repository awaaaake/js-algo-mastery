//다시풀기기
const ORIGIN = 0
const REVERSED = 1
const INF = 987654321

function solution( n, start, end, roads, traps ){
   const edges = new Array(n+1).fill().map( _ => [])
   const di = new Array(n+1).fill().map( _ => new Array( 1 << traps.length).fill(INF))
   const isTrapList = new Array(n+1).fill().map( (_,idx) => traps.findIndex( trapIdx => trapIdx === idx))
   
   roads.forEach( road => {
       const [start, end, cost] = road
       edges[start].push([cost, end, ORIGIN])
       edges[end].push([cost, start, REVERSED])
   })
   
   const trapStatus = 0
   const firstCost = 0
   
   const Q = new MinHeap()
   const firElem = makeQElement(firstCost, start, trapStatus)
   Q.push(firElem)
   
   while(Q.size()){
       const [cost, position, curTrapStatus] = Q.pop()
       
       edges[position].forEach( edge => {
           
           const [nextCost, goal, direction] = edge
           const curDirection = findEdgeDirection( position, goal, curTrapStatus, isTrapList)
           if( direction !== curDirection ) return
           
           const totalCost = cost + nextCost
           
           if(totalCost < di[goal][curTrapStatus]){
               const nextStatus = findNextTrapStatus( goal, curTrapStatus, isTrapList)
               di[goal][curTrapStatus] = totalCost
               Q.push(makeQElement(totalCost, goal, nextStatus))
           }
       })
   }
   return findMinGoal(di, end)
}

function makeQElement(cost, position, trapStatus){
   return [cost, position, trapStatus]
}

function findMinGoal( di, end ){
   return Math.min(...di[end]);
}

function findNextTrapStatus( goal, trapStatus, isTrapList ){
   const trapIdx = isTrapList[goal]
   if(trapIdx === -1) return trapStatus//목표노드가 트랩이 아닌 경우
   return trapStatus ^ (1 << trapIdx)//트랩인 경우, 해당 트랩의 상태를 토글(켜짐 -> 꺼짐, 꺼짐 -> 켜짐)
}

function findEdgeDirection( curNode, goalNode, trapStatus, isTrapList){
   const curActived = isTrapActived( curNode, trapStatus, isTrapList )
   const goalActived = isTrapActived( goalNode, trapStatus, isTrapList )
   
   if( goalActived === curActived ) return ORIGIN
   return REVERSED
}

function isTrapActived( position, trapStatus, isTrapList ){
   const trapIdx = isTrapList[position]
   if(trapIdx === -1) return false
   return !!(trapStatus & 1 << trapIdx)
   
}


class MinHeap{
   constructor(){
       this._heap = [null,]
       this._rootIdx = 1
   }
   
   swap(idx1, idx2){
       [this._heap[idx1], this._heap[idx2]] = [this._heap[idx2], this._heap[idx1]]
   }
   
   size(){
       return this._heap.length - 1
   }
   
   getMaxPossibleIdx(){
       const heapLen = this._heap.length - 1
       return (heapLen / 2) >> 0
   }
   
   push(elem){
       this._heap.push(elem)
       
       let childIdx = this._heap.length - 1
       
       while(childIdx !== this._rootIdx){
           const parIdx = (childIdx / 2) >> 0
           if(this._heap[childIdx][0] < this._heap[parIdx][0]){
               this.swap(childIdx, parIdx)
               
               childIdx = parIdx
           }
           else
               break
       }
   }
   
   pop(){
       
       const popElem = this._heap[1]
       
       const leafElem = this._heap.pop()
       
       if(!this.size()) return popElem
       
       this._heap[1] = leafElem
       
       
       let curIdx = this._rootIdx
       while(this._heap[curIdx*2]){
           const leftIdx = curIdx * 2
           const rightIdx = leftIdx < this.size() - 1 ? leftIdx + 1 : -1
           const leftVal = this._heap[leftIdx][0]
           const rightVal = rightIdx === -1 ? leftVal + 1 : this._heap[rightIdx][0]
           
           const minIdx = leftVal < rightVal ? leftIdx : rightIdx
           
           if( this._heap[curIdx][0] > this._heap[minIdx][0] ){
               this.swap(minIdx, curIdx)
               curIdx = minIdx
           }
           else break
       }
       
       return popElem
   }
}