import React from 'react';

export default function managerCard({ user }) {
  return (
    <ul>
      <li>{user.id}</li>
      <li>{user.real_name}</li>
      <li>{user.current_nickname}</li>
    </ul>
  );
}
