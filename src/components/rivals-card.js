import React, { useState } from 'react';
import fetchManagerById from '../api/fetch-manager-by-id';
import buildManagerCollection from '../utils/build-manager-collection';

export default function rivalsCard({ matchups }) {
  if (matchups.length < 1) return (<div></div>);

  const [mostBeaten, setMostBeaten] = useState({});
  const [mostLost, setMostLost] = useState({});

  const getMostBeaten = async function(id) {
    let manager = await fetchManagerById(id);
    setMostBeaten(manager);
  }

  const getMostLost = async function(id) {
    let manager = await fetchManagerById(id);
    setMostLost(manager);
  }

  let beaten = matchups.filter((matchup) => matchup.victory)
    .map((matchup) => matchup.opponent_id)
    .reduce(buildManagerCollection, [])
    .sort((a, b) => b.count - a.count);

  let lost = matchups.filter((matchup) => !matchup.victory)
    .map((matchup) => matchup.opponent_id)
    .reduce(buildManagerCollection, [])
    .sort((a, b) => b.count - a.count);


  if (lost.length > 0 && !mostLost.real_name) {
    getMostLost(lost[0].id);
  }

  if (beaten.length > 0 && !mostBeaten.real_name) {
    getMostBeaten(beaten[0].id);
  }

  return (
    <div>
      <p>Most beaten opponent: {mostBeaten.real_name} (wins: {beaten[0].count})</p>
      <p>Lost to most: {mostLost.real_name} (losses: {lost[0].count})</p>
    </div>
  );
}
