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

function getHighestScore(matchups) {
  if (!matchups || matchups.length < 1) return;
  let highestMatchup = sortMatchupsByScore(matchups).reverse()[0];
  return highestMatchup.score;
}

function getLowestScore(matchups) {
  if (!matchups || matchups.length < 1) return;
  let lowestMatchup = sortMatchupsByScore(matchups)[0];
  return lowestMatchup.score;
}

function getHighestVictory(matchups = []) {
  let victoryMatchups = matchups.filter((matchup) => matchup.victory);
  return getHighestScore(victoryMatchups);
}

function getLowestVictory(matchups = []) {
  let victoryMatchups = matchups.filter((matchup) => matchup.victory);
  return getLowestScore(victoryMatchups);
}

function getHighestLoss(matchups = []) {
  let lostMatchups = matchups.filter((matchup) => !matchup.victory);
  return getHighestScore(lostMatchups);
}

function getLowestLoss(matchups = []) {
  let lostMatchups = matchups.filter((matchup) => !matchup.victory);
  return getLowestScore(lostMatchups);
}

function sortMatchupsByScore(matchups) {
  return matchups.sort((a, b) => a.score - b.score);
}

function getLongestStreak(matchupsBySeason, isVictory = true) {
  let longestStreak = 0;

  matchupsBySeason.forEach((matchups) => {
    let highestCount = 0;
    let currentCount = 0;
    
    matchups.sort((a, b) => a.week - b.week).forEach((matchup) => {
      if (matchup.victory === isVictory) {
        currentCount++;
      } else {
        if (highestCount < currentCount) highestCount = currentCount;
        currentCount = 0;
      }
      if (highestCount < currentCount) {
        highestCount = currentCount;
      }
    });
    if (highestCount > longestStreak) {
      longestStreak = highestCount;
    }
  });
  return longestStreak;
}

export {
  getAverageScore,
  mapScores,
  getTotalScore,
  getHighestVictory,
  getHighestLoss,
  getLowestVictory,
  getLowestLoss,
  getLongestStreak
};
