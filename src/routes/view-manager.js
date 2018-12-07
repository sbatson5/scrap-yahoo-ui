import React, { useState } from 'react';
import fetchManagerById from '../api/fetch-manager-by-id';
import fetchMatchups from '../api/fetch-matchups';
import fetchAllSeasons from '../api/fetch-all-seasons';
import ManagerCard from '../components/manager-card';
import MatchupStats from '../components/matchup-stats';
import RivalsCard from '../components/rivals-card';

export default function manager({ match }) {
  const [user, setUser] = useState({});
  const [matchups, setMatchups] = useState([]);
  const [matchupsAsOpponent, setMatchupsAsOpponent] = useState([]);
  const [seasons, setSeasons] = useState([]);

  const getManager = async function() {
    let manager = await fetchManagerById(match.params.id)
    setUser(manager);
  }

  const getMatchups = async function() {
    let matchups = await fetchMatchups({ managerId: user.id });
    setMatchups(matchups);
  }

  const getMatchupsAsOpponent = async function() {
    let matchups = await fetchMatchups({ opponentId: user.id });
    setMatchupsAsOpponent(matchups);
  }

  const getSeasons = async function() {
    let seasons = await fetchAllSeasons();
    setSeasons(seasons);
  }

  if (seasons.length < 1) getSeasons();

  if (!user.id) getManager();
  if (matchups.length < 1 && user.id) getMatchups();
  if (matchupsAsOpponent.length < 1 && user.id) getMatchupsAsOpponent();

  const matchupsBySeason = (seasonId) => matchups.filter((matchup) => matchup.season_id === seasonId);

  const getWins = (seasonId) => {
    let filteredMatchups = seasonId ? matchupsBySeason(seasonId) : matchups;
    return filteredMatchups.filter((matchup) => matchup.victory).length;
  }

  const getLosses = (seasonId) => {
    let filteredMatchups = seasonId ? matchupsBySeason(seasonId) : matchups;
    return filteredMatchups.filter((matchup) => !matchup.victory).length;
  }

  return (
    <div>
      <ManagerCard user={user} />
      <h2>Overall</h2>
      <p>Wins: {getWins()}</p>
      <p>Losses: {getLosses()}</p>
      <MatchupStats matchups={matchups} />
      <RivalsCard matchups={matchups} />
      <h2>By season</h2>
      {seasons.map((season) => {
        return(
          <div key={season.id}>
            <h3>{season.year}</h3>
            <p>Wins: {getWins(season.id)}</p>
            <p>Losses: {getLosses(season.id)}</p>
            <MatchupStats matchups={matchupsBySeason(season.id)} />
          </div>
        )
      })}
    </div>
  );
}
