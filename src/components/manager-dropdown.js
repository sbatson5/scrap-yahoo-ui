import React from 'react';

export default function managerDropdown({ managers, label, onChange, name, value }) {
  return (
    <div className="form-group">
      <label>{label}
        <select className="form-control" name={name} value={value} onChange={onChange}>
          <option selected disabled>-- Select Manager --</option>
          {managers.map((manager) => {
            return <option value={manager.id} key={manager.id}>{manager.real_name}</option>;
          })}
        </select>
      </label>
    </div>
  );
}
