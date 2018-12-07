import React from 'react';
import {
  getAverageScore,
  getHighestVictory,
  getHighestLoss,
  getLowestVictory,
  getLowestLoss
} from '../utils/matchup-scores';

export default function matchUpStats({ matchups }) {

  return (
    <div class="card-body">
      <p>Highest Victory: {getHighestVictory(matchups)}</p>
      <p>Lowest Victory: {getLowestVictory(matchups)}</p>
      <p>Highest Loss: {getHighestLoss(matchups)}</p>
      <p>Lowest Loss: {getLowestLoss(matchups)}</p>
      <p>Average Score: {getAverageScore(matchups)}</p>
    </div>
  );
}
