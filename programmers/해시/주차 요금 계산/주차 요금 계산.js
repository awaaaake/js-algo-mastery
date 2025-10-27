function solution(fees, records) {
  const [baseTime, baseFee, unitTime, unitFee] = fees;
  const inTime = new Map(); //차량 번호 : 입차 시간
  const totalTime = new Map(); //차량 번호 : 누적 주차 시간

  for (let rc of records) {
    let [timeStr, number, state] = rc.split(" ");
    number = Number(number);
    const [h, m] = timeStr.split(":").map(Number);
    const time = h * 60 + m; //시간 계산은 분 단위로 통일

    if (state === "IN") {
      inTime.set(number, time);
    }

    if (state === "OUT") {
      const parked = time - inTime.get(number);
      totalTime.set(number, (totalTime.get(number) || 0) + parked);
      inTime.delete(number); //출차한 차량은 제거(null로 설정하는 것보다 제거하는것이 명확하고 메모리 효율적이다)
    }
  }

  for (let [number, time] of inTime.entries()) {
    const parked = 23 * 60 + 59 - time; //출차를 안한 차들은 23:59 기준으로 출차시킨다.
    totalTime.set(number, (totalTime.get(number) || 0) + parked);
  }

  const result = [...totalTime.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([number, time]) => {
      if (time <= baseTime) return baseFee;
      return baseFee + Math.ceil((time - baseTime) / unitTime) * unitFee;
    });

  return result;
}
