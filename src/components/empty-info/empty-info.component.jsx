import React from 'react';

import RobotPoseImage from '../../assets/robot/9.png';

import './empty-info.styles.scss';

export default function EmptyInfo({title, description}) {
  return (
    <div className='emptyInfo'>
      <div className='emptyInfo__imageContainer'>
        <img src={RobotPoseImage} alt='' />
      </div>
      <div className='emptyInfo__message'>
        <p className='emptyInfo__message-title'>{title}</p>
        <p className='emptyInfo__message-description'>{description}</p>
      </div>
    </div>
  );
}