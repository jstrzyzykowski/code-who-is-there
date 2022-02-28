import React from 'react';

import './custom-item-icon.styles.scss';

export default function CustomItemIcon({displayName, imageUrl, quantity}) {
  return (
    <div className="customItemIcon">
      <img src={imageUrl} alt={displayName} />
      <div className="customItemIcon__quantity">
        <p className="customItemIcon__quantity-value">{quantity}</p>
      </div>
    </div>
  );
}