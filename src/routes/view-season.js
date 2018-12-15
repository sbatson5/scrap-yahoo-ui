import React, { useState } from 'react';
import fetchSeasonById from '../api/fetch-season-by-id';
import fetchAllManagers from '../api/fetch-all-managers';
import ManagerDropdown from '../components/manager-dropdown';
import saveSeason from '../api/save-season';

export default function manager({ match }) {
  const [managers, setManagers] = useState([]);
  const [season, setSeason] = useState({});

  const getManagers = async function() {
    let managers = await fetchAllManagers();
    setManagers(managers);
  };

  const getSeason = async function() {
    let season = await fetchSeasonById(match.params.id);
    setSeason(season);
  };

  if (managers.length < 1) getManagers();
  if (!season.id) getSeason();

  const updateSeason = function({ target }) {
    let hash = {};
    let { name, value } = target;
    hash[name] = value;
    Object.assign(season, hash);
    setSeason(season);
  };

  const submit = function(e) {
    e.preventDefault();
    saveSeason(season);
  };

  if (!season.year) {
    return (<h1>No Season found</h1>);
  }
  return (
    <div>
      <h1>{season.year}</h1>
      <form onSubmit={submit}>
        <ManagerDropdown managers={managers} label="First" name="first_id" value={season.first} onChange={updateSeason} />
        <ManagerDropdown managers={managers} label="Second" name="second_id" value={season.second} onChange={updateSeason} />
        <ManagerDropdown managers={managers} label="Third" name="third_id" value={season.third} onChange={updateSeason} />
        <ManagerDropdown managers={managers} label="Fourth" name="fourth_id" value={season.fourth} onChange={updateSeason} />
        <input type="submit" value="Submit" className="btn btn-primary" />
      </form>
    </div>
  );
}
