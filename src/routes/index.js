import React, { useState } from 'react';
import fetchManagerAllManagers from '../api/fetch-all-managers';
import fetchAllSeasons from '../api/fetch-all-seasons';
import { Link } from "react-router-dom";
import ChampionsCard from '../components/champions-card';
import PlayoffsCard from '../components/playoffs-card';

export default function index() {
  const [managers, setManagers] = useState([]);
  const [seasons, setSeasons] = useState([]);

  const getManagers = async function() {
    let manager = await fetchManagerAllManagers()
    setManagers(manager);
  }

  const getSeasons = async function() {
    let seasons = await fetchAllSeasons();
    setSeasons(seasons);
  }

  if (managers.length < 1) getManagers();
  if (seasons.length < 1) getSeasons();

  return (
    <div>
      <ul>
        {managers.map((manager) => {
          return(
            <li key={manager.id}>
              <Link to={`/view-manager/${manager.id}`}>{manager.real_name}</Link>
            </li>
          )
        })}
      </ul>
      <section className="playoff-info">
        <ChampionsCard seasons={seasons} managers={managers} />
        <PlayoffsCard seasons={seasons} managers={managers} />
      </section>
    </div>
  );
}
