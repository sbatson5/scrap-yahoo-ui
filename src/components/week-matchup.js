import React from 'react';

export default function weekMatchup({ matchup, managers }) {

  const updateMatchup = function({ target }) {
    let hash = {};
    hash[target.name] = target.value;
    Object.assign(matchup, hash);
  }

  return (
    <div className="form-group">
      <label>Winner
        <select className="form-control" name="winnerId" defaultValue="empty" value={matchup.winnerId} onChange={updateMatchup}>
          <option value="empty" disabled>-- Select Manager --</option>
          {managers.map((manager) => {
            return <option value={manager.id} key={manager.id}>{manager.real_name}</option>;
          })}
        </select>
      </label>
      <label>Winner Score
        <input name="winnerScore" type="text" className="form-control" value={matchup.score} onChange={updateMatchup} />
      </label>

      <span>Versus</span>

      <label>Loser
        <select className="form-control" name="loserId" defaultValue="empty" value={matchup.loserId} onChange={updateMatchup}>
          <option value="empty" disabled>-- Select Manager --</option>
          {managers.map((manager) => {
            return <option value={manager.id} key={manager.id}>{manager.real_name}</option>;
          })}
        </select>
      </label>

      <label>Loser Score
        <input name="loserScore" type="text" className="form-control" value={matchup.score} onChange={updateMatchup} />
      </label>
    </div>
  );
}
