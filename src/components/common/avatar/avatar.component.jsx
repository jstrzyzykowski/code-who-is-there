import React from 'react';
import PropTypes from 'prop-types';

import './avatar.styles.scss';

export default function Avatar({imageURL, circle, size, withActivityStatus, activityStatus}) {
  return(
    <div className={`avatar ${circle ? 'circle' : ''}`} style={{width: `${size}px`, height: `${size}px`}}>
      <img className="avatar__image" src={imageURL} alt=""/>
      {withActivityStatus && <div className={`avatar__activityStatus ${activityStatus ? 'active' : ''}`}/>}
    </div>
  );
}

Avatar.prototype = {
  imageURL: PropTypes.string.isRequired,
  circle: PropTypes.bool,
  size: PropTypes.number.isRequired,
  withActivityStatus: PropTypes.bool,
};