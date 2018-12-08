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

  const matchupSeasons = matchups.map((matchup) => matchup.season_id);
  const uniqueMatchupSeasons = [...new Set(matchupSeasons)];

  const getMatchupsAsOpponent = async function() {
    let matchups = await fetchMatchups({ opponentId: user.id });
    setMatchupsAsOpponent(matchups);
  }

  const getSeasons = async function() {
    let seasons = await fetchAllSeasons();
    seasons = seasons.filter((season) => uniqueMatchupSeasons.includes(season.id));
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
    <div className="manager-container">
      <div className="full-width-manager">
        <ManagerCard user={user} />
        <h2>Overall</h2>
        <p>Wins: {getWins()}</p>
        <p>Losses: {getLosses()}</p>
        <MatchupStats matchups={matchups} />
        <RivalsCard matchups={matchups} />
      </div>
      <section className="seasons">
        {seasons.map((season) => {
          return(
            <div key={season.id} className="card manager-card">
              <h3>{season.year}</h3>
              <p>Wins: {getWins(season.id)}</p>
              <p>Losses: {getLosses(season.id)}</p>
              <MatchupStats matchups={matchupsBySeason(season.id)} />
            </div>
          )
        })}
      </section>
    </div>
  );
}
