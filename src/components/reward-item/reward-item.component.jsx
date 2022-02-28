import React from 'react';

import ItemImage from '../../assets/image_placeholder.jpg';

import './reward-item.styles.scss';

export default function RewardItem() {
  return(
    <div className="rewardItem">
      <div className="rewardItem__itemImageContainer">
        <img src={ItemImage} alt="" />
      </div>
      <div className="rewardItem__itemInfoContainer">
        <p className="rewardItem__itemInfoContainer-name">
          Item Name
        </p>
        <p className="rewardItem__itemInfoContainer-description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
          accusantium cum iste
        </p>
      </div>
    </div>
  );
}