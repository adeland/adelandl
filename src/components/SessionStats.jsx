import React from 'react';
import { statsData } from '../data/statsData';

/* The big serif figures under About — years, hands, growth, latency. */
const SessionStats = () => {
  const items = statsData.items ?? [];
  if (items.length === 0) return null;

  return (
    <div className="stats-row">
      {items.map((stat, i) => (
        <div
          key={stat.label}
          className="stat reveal"
          style={{ '--delay': `${i * 70}ms` }}
        >
          <span className="stat-value">{stat.value}</span>
          <span className="stat-label mono-label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
};

export default SessionStats;
