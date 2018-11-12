import React, { useState } from 'react';
import saveManager from '../utils/save-manager';

export default function newManager() {
  const [user, setUser] = useState({});
  const submit = function(e) {
    e.preventDefault();
    saveManager(user);
  };

  const updateField = function({ target }) {
    let updatedInfo = {};
    updatedInfo[target.name] = target.value;
    setUser(Object.assign(user, updatedInfo));
  }

  return (
    <div>
      <p>name: {user.real_name} -- nickname: {user.current_nickname} </p>
      <form onSubmit={submit}>
        <label>
          Name
          <input type="text" value={user.real_name} name="real_name" onChange={updateField} />
        </label>
        <label>
          Nick Name
          <input type="text" value={user.current_nickname} name="current_nickname" onChange={updateField} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
