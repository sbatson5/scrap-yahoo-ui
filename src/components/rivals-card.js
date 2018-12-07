import React, { useState } from 'react';
import fetchManagerById from '../api/fetch-manager-by-id';

function buildCollection(collection = [], opponentId) {
  let opponent = collection.find((manager) => manager.id === opponentId);
  if (!opponent) {
    collection.push({ id: opponentId, count: 1 });
  } else {
    opponent['count']++;
  }
  return collection;
}

export default function rivalsCard({ matchups }) {
  if (matchups.length < 1) return (<div></div>);

  const [mostBeaten, setMostBeaten] = useState({});
  const [mostLost, setMostLost] = useState({});

  const getMostBeaten = async function(id) {
    let manager = await fetchManagerById(id)
    setMostBeaten(manager);
  }

  const getMostLost = async function(id) {
    let manager = await fetchManagerById(id)
    setMostLost(manager);
  }

  let beatenHash = {};
  let lostHash = {};

  let beaten = matchups.filter((matchup) => matchup.victory)
    .map((matchup) => matchup.opponent_id)
    .reduce(buildCollection, [])
    .sort((a, b) => b.count - a.count);

  let lost = matchups.filter((matchup) => !matchup.victory)
    .map((matchup) => matchup.opponent_id)
    .reduce(buildCollection, [])
    .sort((a, b) => b.count - a.count);


  if (lost.length > 0 && !mostLost.real_name) {
    getMostLost(lost[0].id);
  }

  if (beaten.length > 0 && !mostBeaten.real_name) {
    getMostBeaten(beaten[0].id);
  }


  return (
    <div>
      <p>Most beaten opponent: {mostBeaten.real_name}</p>
      <p>Lost to most: {mostLost.real_name}</p>
    </div>
  );
}