import React from 'react';

export default function managerCard({ user }) {
  return (
    <div>
      <p>{user.real_name}</p>
      <p>{user.current_nickname}</p>
    </div>
  );
}
