import React from 'react';
import { getAverageScore } from '../utils/matchup-scores';

export default function matchUpStats({ matchups }) {

  const matchupsByScore = matchups.sort((a, b) => a.score - b.score);

  const victoryScores = matchupsByScore
    .filter((matchup) => matchup.victory)
    .map((matchup) => parseFloat(matchup.score));

  const lossScores = matchupsByScore
    .filter((matchup) => !matchup.victory)
    .map((matchup) => parseFloat(matchup.score));

  const lowestVictory = victoryScores[0];
  const highestVictory = victoryScores.reverse()[0];
  const lowestLoss = lossScores[0];
  const highestLoss = lossScores.reverse()[0];

  return (
    <div>
      <p>Highest Victory: {highestVictory}</p>
      <p>Lowest Victory: {lowestVictory}</p>
      <p>Highest Loss: {highestLoss}</p>
      <p>Lowest Loss: {lowestLoss}</p>
      <p>Average Score: {getAverageScore(matchups)}</p>
    </div>
  );
}
