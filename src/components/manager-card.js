import React from 'react';

export default function managerCard({ user }) {
  return (
    <div>
      <h1>{user.real_name}</h1>
      <h2>{user.current_nickname}</h2>
    </div>
  );
}
