import React from 'react';

import './reward-list-nameItem.styles.scss';

export default function RewardListNameItem({displayName, quantity, rarity}) {
  return (
    <div className="rewardListNameItem">
      <p className="rewardListNameItem__name">
        {quantity} x {displayName}
      </p>
      <p className="rewardListNameItem__rarity">
        {rarity}%
      </p>
    </div>
  );
}