import React, { useState } from 'react';
import fetchAllManagers from '../api/fetch-all-managers';
import fetchAllSeasons from '../api/fetch-all-seasons';
import saveMatchup from '../api/save-matchup';

export default function manager() {
  const [managers, setManagers] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [matchup, setMatchup] = useState({ victory: false });

  const weeks = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];

  const getManagers = async function() {
    let managers = await fetchAllManagers();
    setManagers(managers);
  };

  const getSeasons = async function() {
    let seasons = await fetchAllSeasons();
    setSeasons(seasons);
  };

  if (managers.length < 1) getManagers();
  if (seasons.length < 1) getSeasons();

  const submit = function(e) {
    e.preventDefault();
    saveMatchup(matchup);
  };

  const updateMatchup = function({ target }) {
    let hash = {};
    let value = target.type === 'checkbox' ? target.checked : target.value;
    hash[target.name] = value;
    Object.assign(matchup, hash);
    setMatchup(matchup);
  };

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

        <div class="form-group">
          <label>Season
            <select class="form-control" name="season_id" value={matchup.seasonId} onChange={updateMatchup}>
              <option selected disabled>-- Select Season --</option>
              {seasons.map((season) => {
                return <option value={season.id} key={season.id}>{season.year}</option>;
              })}
            </select>
          </label>
        </div>

        <div class="form-group">
          <label>Manager
            <select class="form-control" name="manager_id" value={matchup.manager_id} onChange={updateMatchup}>
              <option selected disabled>-- Select Manager --</option>
              {managers.map((manager) => {
                return <option value={manager.id} key={manager.id}>{manager.real_name}</option>;
              })}
            </select>
          </label>
        </div>

        <div class="form-group">
          <label>Opponent
            <select class="form-control" name="opponent_id" value={matchup.opponent_id} onChange={updateMatchup}>
              <option selected disabled>-- Select Manager --</option>
              {managers.map((manager) => {
                return <option value={manager.id} key={manager.id}>{manager.real_name}</option>;
              })}
            </select>
          </label>
        </div>

        <div class="form-group">
          <label>Week
            <select class="form-control" name="week" value={matchup.week} onChange={updateMatchup}>
              <option selected disabled>-- Select Week --</option>
              {weeks.map((week, index) => {
                return <option value={week} key={index}>{week}</option>;
              })}
            </select>
          </label>
        </div>

        <div class="form-group">
          <label>Score
            <input name="score" type="text" class="form-control" value={matchup.score} onChange={updateMatchup} />
          </label>
        </div>

        <div class="form-group">
          <input
            name="victory"
            type="checkbox"
            class="form-check-input"
            id="victory"
            checked={matchup.victory}
            onChange={updateMatchup} />
            <label class="form-check-label" for="victory">Victory?</label>
        </div>

        <input type="submit" value="Submit" class="btn btn-primary" />
      </form>
    </div>
  );
}
