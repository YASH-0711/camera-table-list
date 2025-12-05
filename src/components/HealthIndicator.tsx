import React from 'react';
import './Health.css';

interface HealthIndicatorProps {
  type: 'cloud' | 'device';
  value: string;
  icon: string;
}

export const HealthIndicator: React.FC<HealthIndicatorProps> = ({ type, value, icon }) => {
  const colorMap: Record<string, string> = {
    A: 'green',
    B: 'orange',
    C: 'orange',
    '-': 'gray',
  };

  const strokeColor = colorMap[value] ?? 'gray';

  return (
    <div className="health-item">
      <div className="health-icon">
        <img src={icon}/>
      </div>

      <div className={`health-circle ${strokeColor}`}>
        <span className="health-text">{value}</span>
      </div>
    </div>
  );
};
