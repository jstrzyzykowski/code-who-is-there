import React from 'react';

import './battle-stat.styles.scss';

export default function BattleStat({ label, value }) {
  return (
    <div className="battleStat">
      <p className="battleStat__value">{value}</p>
      <p className="battleStat__label">{label}</p>
    </div>
  );
}