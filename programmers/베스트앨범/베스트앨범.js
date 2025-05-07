function solution(genres, plays) {
  let bestAlbum = new Map(); //각 장르별 노래 재생 정보([노래번호, 노래 재생횟수])
  let genreCnt = new Map(); //각 장르별 누적 재생 횟수

  for (let i = 0; i < plays.length; i++) {
    const genre = genres[i];
    const songPlay = plays[i];

    bestAlbum.set(genres[i], [
      ...(bestAlbum.get(genres[i]) || []),
      [i, songPlay],
    ]);
    genreCnt.set(genres[i], (genreCnt.get(genre) || 0) + songPlay);
  }

  genreCnt = Array.from(genreCnt);
  genreCnt.sort((a, b) => b[1] - a[1]);

  const answer = [];
  for (let [genre, cnt] of genreCnt) {
    const temp = bestAlbum
      .get(genre)
      .sort((a, b) => {
        if (a[1] === b[1]) return a[0] - b[0];
        return b[1] - a[1];
      })
      .slice(0, 2);
    answer.push(...temp.map((el) => el[0]));
  }
  return answer;
}
