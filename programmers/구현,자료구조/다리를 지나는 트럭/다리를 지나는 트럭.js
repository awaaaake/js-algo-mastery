function solution(bridge_length, weight, truck_weights) {
  let time = 0;
  let onBridgeWeight = 0;
  const bridge = Array(bridge_length).fill(0); //현재 다리 상태

  while (bridge.length) {
    time += 1;

    onBridgeWeight -= bridge.shift();

    if (truck_weights.length) {
      if (onBridgeWeight + truck_weights[0] <= weight) {
        const next = truck_weights.shift();
        bridge.push(next);
        onBridgeWeight += next;
      } else {
        bridge.push(0);
      }
    }
  }
  return time;
}
