import React, { useState } from 'react';
import fetchAllManagers from '../utils/fetch-all-managers';
import fetchAllSeasons from '../utils/fetch-all-seasons';
import saveMatchup from '../utils/save-matchup';
import ManagerCard from './manager-card';
import NewManager from './new-manager';

export default function manager() {
  const [managers, setManagers] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [matchup, setMatchup] = useState({ victory: false });

  const weeks = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];

  const getManagers = async function() {
    let managers = await fetchAllManagers();
    setManagers(managers);
  }

  const getSeasons = async function() {
    let seasons = await fetchAllSeasons();
    setSeasons(seasons);
  }

  if (managers.length < 1) getManagers();
  if (seasons.length < 1) getSeasons();

  const submit = function(e) {
    e.preventDefault();
    saveMatchup(matchup);
  };

  const setSeason = function(event) {
    let seasonHash = { season_id: event.target.value }
    Object.assign(matchup, seasonHash);
    setMatchup(matchup);
  }

  const updateMatchup = function({ target }) {
    let hash = {};
    let value = target.type === 'checkbox' ? target.checked : target.value;
    hash[target.name] = value;
    Object.assign(matchup, hash);
    setMatchup(matchup);
  }

  return (
    <div>
      <ul>Matchup
        <li>match season: {matchup.season_id}</li>
        <li>manager: {matchup.manager_id}</li>
        <li>opponent: {matchup.opponent_id}</li>
        <li>score: {matchup.score}</li>
        <li>victory: {matchup.victory}</li>
      </ul>
      <form onSubmit={submit}>
        <label>Season
          <select name="season_id" value={matchup.seasonId} onChange={updateMatchup}>
            <option selected disabled>-- Select Season --</option>
            {seasons.map((season) => {
              return <option value={season.id} key={season.id}>{season.year}</option>;
            })}
          </select>
        </label>

        <label>Manager
          <select name="manager_id" value={matchup.manager_id} onChange={updateMatchup}>
            <option selected disabled>-- Select Manager --</option>
            {managers.map((manager) => {
              return <option value={manager.id} key={manager.id}>{manager.real_name}</option>;
            })}
          </select>
        </label>

        <label>Opponent
          <select name="opponent_id" value={matchup.opponent_id} onChange={updateMatchup}>
            <option selected disabled>-- Select Manager --</option>
            {managers.map((manager) => {
              return <option value={manager.id} key={manager.id}>{manager.real_name}</option>;
            })}
          </select>
        </label>

        <label>Week
          <select name="week" value={matchup.week} onChange={updateMatchup}>
            <option selected disabled>-- Select Week --</option>
            {weeks.map((week, index) => {
              return <option value={week} key={index}>{week}</option>;
            })}
          </select>
        </label>

        <label>Score
          <input name="score" type="text" value={matchup.score} onChange={updateMatchup} />
        </label>

        <label>Victory?
        <input
          name="victory"
          type="checkbox"
          checked={matchup.victory}
          onChange={updateMatchup} />
        </label>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
