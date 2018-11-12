import React, { useState } from 'react';
import fetchManagerById from '../utils/fetch-manager-by-id';
import ManagerCard from './manager-card';

export default function manager({ match }) {
  const [user, setUser] = useState({});

  const getManager = async function() {
    let manager = await fetchManagerById(match.params.id)
    setUser(manager);
  }

  getManager();

  return (
    <div>
      <ManagerCard user={user} />
    </div>
  );
}
