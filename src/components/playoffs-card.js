import React from 'react';
import buildManagerCollection from '../utils/build-manager-collection';

export default function playoffsCard({ seasons, managers }) {
  let playoffManagers = seasons
  .map((season) => {
    let { first_id, second_id, third_id, fourth_id } = season;
    return [first_id, second_id, third_id, fourth_id].filter((id) => id);
  })
  .flat()
  .reduce(buildManagerCollection, [])
  .sort((a, b) => b.count - a.count);

  const getManagerName = (id) => {
    let manager = (managers || []).find((manager) => manager.id === id);
    if (!manager) return;
    return manager.real_name;
  }

  return (
    <div className="card-body">
      <h2>Who made the playoffs?</h2>
      <ul>
      {playoffManagers.map((playoffManager) => {
        return (
          <li key={playoffManager.id}>{getManagerName(playoffManager.id)} - Trips: {playoffManager.count}</li>
        );
      })}
      </ul>
    </div>
  );
}
