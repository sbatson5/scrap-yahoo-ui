import React, { useState } from 'react';
import fetchAllManagers from '../api/fetch-all-managers';
import fetchAllSeasons from '../api/fetch-all-seasons';
import saveMatchup from '../api/save-matchup';
import WeekMatchup from '../components/week-matchup';

function dataIncomplete(matchup) {
  return !matchup.winnerId || !matchup.loserId || !matchup.winnerScore || !matchup.loserScore;
}

export default function manager() {
  const [managers, setManagers] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [season, setSeason] = useState();
  const [week, setWeek] = useState();
  const startingMatchups = [{},{},{},{},{},{}];
  const [matchupCollection, setMatchupCollection] = useState(startingMatchups);

  const weeks = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

  const getManagers = async function() {
    let managers = await fetchAllManagers();
    setManagers(managers);
  }

  const getSeasons = async function() {
    let seasons = await fetchAllSeasons();
    seasons = seasons.sort((a, b) => b.year - a.year);
    setSeasons(seasons);
  }

  if (managers.length < 1) getManagers();
  if (seasons.length < 1) getSeasons();

  const submit = function(e) {
    e.preventDefault();
    matchupCollection.forEach((matchup) => {
      if (dataIncomplete(matchup) || (!season || !week)) {
        console.log('hi');
        return;
      }
      let winner = {
        season_id: season,
        manager_id: matchup.winnerId,
        opponent_id: matchup.loserId,
        score: matchup.winnerScore,
        week: week,
        victory: true
      };
      let loser = {
        season_id: season,
        manager_id: matchup.loserId,
        opponent_id: matchup.winnerId,
        score: matchup.loserScore,
        week: week,
        victory: false
      };
      saveMatchup(winner);
      saveMatchup(loser);
    })
  };

  const updateSeason = e => {
    setSeason(e.target.value);
    document.getElementById("matchup-form").reset();
    setMatchupCollection(startingMatchups);
  };

  const updateWeek = e => {
    setWeek(e.target.value);
    document.getElementById("matchup-form").reset();
    setMatchupCollection(startingMatchups);
  };

  return (
    <div>
      <form id="matchup-form" onSubmit={submit}>
        <div className="form-group">
          <label>Season
            <select className="form-control" name="season_id" defaultValue="empty" value={season} onChange={updateSeason}>
              <option value="empty" disabled>-- Select Season --</option>
              {seasons.map((season) => {
                return <option value={season.id} key={season.id}>{season.year}</option>;
              })}
            </select>
          </label>
          <label>Week
            <select className="form-control" name="week" defaultValue="empty" value={week} onChange={updateWeek}>
              <option value="empty" disabled>-- Select Week --</option>
              {weeks.map((week, index) => {
                return <option value={week} key={index}>{week}</option>;
              })}
            </select>
          </label>
        </div>

        {matchupCollection.map((matchup, index) => {
          return (
            <div key={index}>
              <WeekMatchup matchup={matchup} managers={managers} />
              <hr />
            </div>
          );
        })}

        <input type="submit" value="Submit" className="btn btn-primary" />
      </form>
    </div>
  );
}
