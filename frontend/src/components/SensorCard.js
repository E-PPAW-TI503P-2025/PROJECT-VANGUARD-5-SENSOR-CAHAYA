import React from 'react';
import './SensorCard.css';

function SensorCard({ label, value, unit, icon = '📊', color = 'blue' }) {
  const getColorClass = () => {
    if (color === 'gold') return 'card-gold';
    if (color === 'red') return 'card-red';
    if (color === 'green') return 'card-green';
    return 'card-blue';
  };

  return (
    <div className={`sensor-card ${getColorClass()}`}>
      <div className="card-icon">{icon}</div>
      <div className="card-content">
        <h3>{label}</h3>
        <div className="card-value">
          <span className="value">{value !== null ? value : '--'}</span>
          <span className="unit">{unit}</span>
        </div>
      </div>
    </div>
  );
}

export default SensorCard;
