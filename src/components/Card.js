import React, { useState, useEffect } from 'react';
const Card = ({ id, title, tag }) => {
  const [selected, setSelected] = useState(false);

  const toggleSelected = () => {
    setSelected(!selected);
  };

  return (
    <div className={`card ${selected ? 'selected' : ''}`} onClick={toggleSelected}>
      <div className="card-header">{id}</div>
      <div className="card-title d-flex align-items-center">
        <span className="me-2">
          {selected && (
            <i className="bi bi-check-circle-fill text-primary"></i>
          )}
        </span>
        <span className="card-title-text" style={{ fontSize: '21px' }}>{title}</span>
      </div>
      <div className="card-tag">
        <label className="form-check-label me-2">
          <input
            type="radio"
            className="form-check-input custom-radio"
            disabled
            checked
          />
          {tag}
        </label>
      </div>
    </div>
  );
};

export default Card;