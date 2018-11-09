import React, { useState } from 'react';
import fetchManager from '../utils/fetch-manager';

export default function example() {
  const [user, setUser] = useState({});

  const getManager = async function() {
    let manager = await fetchManager(4)
    setUser(manager);
  }

  return (
    <div>
      <button onClick={() => getManager()}>
        Get manager information
      </button>
      <ul>
        <li>{user.id}</li>
        <li>{user.real_name}</li>
        <li>{user.current_nickname}</li>
      </ul>
    </div>
  );
}
