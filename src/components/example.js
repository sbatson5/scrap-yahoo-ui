import React, { useState } from 'react';

export default function example() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({});

  const getManager = function() {
    return fetch('http://localhost:3001/api/managers/4', {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      redirect: "follow",
      referrer: "no-referrer"
    })
    .then(response => {
      return response.json().then((manager) => {
        setUser(manager);
      });
    }).catch((error) => {
      console.log(error)
    });
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => getManager()}>
        Click me
      </button>
      <ul>
        <li>{user.id}</li>
        <li>{user.real_name}</li>
      </ul>
    </div>
  );
}
