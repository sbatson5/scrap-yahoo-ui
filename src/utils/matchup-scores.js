function getAverageScore(matchups) {
  if (matchups.length < 1) return 0;

  let scores = mapScores(matchups);
  let numberOfMatchups = scores.length;
  return (getTotalScore(scores) / numberOfMatchups).toFixed(2);
}

function mapScores(matchups) {
  return matchups.map((matchup) => parseFloat(matchup.score));
}

function getTotalScore(scores) {
  return scores.reduce((score, currentValue = 0) => score + currentValue);
}

export {
  getAverageScore,
  mapScores,
  getTotalScore
};
