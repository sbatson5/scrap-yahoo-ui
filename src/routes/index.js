import React, { useState } from 'react';
import fetchManagerAllManagers from '../api/fetch-all-managers';
import { Link } from "react-router-dom";

export default function index() {
  const [managers, setManagers] = useState([]);

  const getManagers = async function() {
    let manager = await fetchManagerAllManagers()
    setManagers(manager);
  }

  if (managers.length < 1) getManagers();

  return (
    <ul>
      {managers.map((manager) => {
        return(
          <li key={manager.id}>
            <Link to={`/view-manager/${manager.id}`}>{manager.real_name}</Link>
          </li>
        )
      })}
    </ul>
  );
}
