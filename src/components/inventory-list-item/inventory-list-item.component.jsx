import React from 'react';

import CustomItemIcon from '../common/custom-item-icon/custom-item-icon.component';

import './inventory-list-item.styles.scss';

export default function InventoryListItem({displayName, imageUrl, quantity, statistics}) {
  return (
    <div className='inventoryListItem'>
      <div className='inventoryListItem__header'>
        <p className='inventoryListItem__header-displayName'>{displayName}</p>
      </div>
      <div className='inventoryListItem__body'>
        <div className='inventoryListItem__body-itemInfoContainer'>
          <CustomItemIcon displayName={displayName} imageUrl={imageUrl} quantity={quantity}/>
          <div className='inventoryListItem__body-itemInfoContainer-statList'>
            <div className='inventoryListItem__body-itemInfoContainer-statList-stat'>
              <i className='fas fa-battery-full'/>
              <p className='inventoryListItem__body-itemInfoContainer-statList-stat-value'>
                <span className='inventoryListItem__body-itemInfoContainer-statList-stat-value-base'>{statistics.battery}</span>
                <span className='inventoryListItem__body-itemInfoContainer-statList-stat-value-all'>{statistics.battery * quantity}</span>
              </p>
            </div>
            <div className='inventoryListItem__body-itemInfoContainer-statList-stat'>
              <i className='fas fa-fist-raised'/>
              <p className='inventoryListItem__body-itemInfoContainer-statList-stat-value'>
                <span className='inventoryListItem__body-itemInfoContainer-statList-stat-value-base'>{statistics.rage}</span>
                <span className='inventoryListItem__body-itemInfoContainer-statList-stat-value-all'>{statistics.rage * quantity}</span>
              </p>
            </div>
            <div className='inventoryListItem__body-itemInfoContainer-statList-stat'>
              <i className='fas fa-shield-alt'/>
              <p className='inventoryListItem__body-itemInfoContainer-statList-stat-value'>
                <span className='inventoryListItem__body-itemInfoContainer-statList-stat-value-base'>{statistics.shield}</span>
                <span className='inventoryListItem__body-itemInfoContainer-statList-stat-value-all'>{statistics.shield * quantity}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}