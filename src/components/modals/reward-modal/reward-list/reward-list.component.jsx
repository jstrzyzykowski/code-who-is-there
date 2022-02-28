import React from 'react';

import RewardListNameItem from '../reward-list-nameItem/reward-list-nameItem.component';
import CustomItemIcon from '../../../common/custom-item-icon/custom-item-icon.component';

import './reward-list.styles.scss';

export default function RewardList({items}) {
  return (
    <div className='rewardList'>
      <div className='rewardList__itemImages'>
        {items.map((item) => <CustomItemIcon key={item.id} {...item}/>)}
      </div>
      <div className='rewardList__itemNames'>
        {items.map((item) => <RewardListNameItem key={item.id} {...item}/>)}
      </div>
    </div>
  );
}