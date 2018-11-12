import React, { useState } from 'react';
import fetchManager from '../utils/fetch-manager';
import ManagerCard from './manager-card';
import NewManager from './new-manager';

export default function manager() {
  const [user, setUser] = useState({});
  const [managerId, setManagerId] = useState(0);

  const getManager = async function() {
    let manager = await fetchManager(managerId)
    setUser(manager);
  }

  const updateManagerId = e => {
    setManagerId(e.target.value)
  }

  return (
    <div>
      <NewManager />
      <input type="text" value={managerId} onChange={updateManagerId} />
      <button onClick={() => getManager()}>
        Get manager information
      </button>
      <ManagerCard  user={user} />
    </div>
  );
}
