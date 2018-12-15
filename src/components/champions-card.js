import React from 'react';
import buildManagerCollection from '../utils/build-manager-collection';

export default function championCard({ seasons, managers }) {
  const champions = (seasons || [])
    .filter((season) => !!season.first_id)
    .map((season) => season.first_id)
    .reduce(buildManagerCollection, [])
    .sort((a, b) => b.count - a.count);

  const getManagerName = (id) => {
    let manager = (managers || []).find((manager) => manager.id === id);
    if (!manager) return;
    return manager.real_name;
  }

  return (
    <div className="card-body">
      <h2>Champions</h2>
      <ul>
        {champions.map((champion) => {
          return (
            <li key={champion.id}>{getManagerName(champion.id)} - Wins: {champion.count}</li>
          );
        })}
      </ul>
    </div>
  );
}
