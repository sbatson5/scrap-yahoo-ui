import React, { useState } from 'react';
import fetchManagerById from '../utils/fetch-manager-by-id';
import fetchMatchups from '../utils/fetch-matchups';
import fetchAllSeasons from '../utils/fetch-all-seasons';
import ManagerCard from '../components/manager-card';

export default function manager({ match }) {
  const [user, setUser] = useState({});
  const [matchups, setMatchups] = useState([]);
  const [seasons, setSeasons] = useState([]);

  const getManager = async function() {
    let manager = await fetchManagerById(match.params.id)
    setUser(manager);
  }

  const getMatchups = async function() {
    let matchups = await fetchMatchups(user.id);
    setMatchups(matchups);
  }

  const getSeasons = async function() {
    let seasons = await fetchAllSeasons();
    setSeasons(seasons);
  }

  if (seasons.length < 1) getSeasons();

  if (!user.id) getManager();
  if (matchups.length < 1 && user.id) getMatchups();

  const getWins = function(seasonId) {
    console.log(seasonId);
    let filteredMatchups = matchups;
    if (seasonId) {
      filteredMatchups = filteredMatchups.filter((matchup) => matchup.season_id === seasonId);
    }
    return filteredMatchups.filter((matchup) => matchup.victory).length;
  }

  const getLosses = function(seasonId) {
    let filteredMatchups = matchups;
    if (seasonId) {
      filteredMatchups = filteredMatchups.filter((matchup) => matchup.season_id === seasonId);
    }
    return filteredMatchups.filter((matchup) => !matchup.victory).length;
  }

  return (
    <div>
      <ManagerCard user={user} />
      <p>Total Wins: {getWins()}</p>
      <p>Total Losses: {getLosses()}</p>
      <h2>By season</h2>
      {seasons.map((season) => {
        return(
          <div>
            <h3 key={season.id}>{season.year}</h3>
            <p key="wins-{season.id}">Wins: {getWins(season.id)}</p>
            <p key="losses-{season.id}">Losses: {getLosses(season.id)}</p>
          </div>
        )
      })}
    </div>
  );
}
