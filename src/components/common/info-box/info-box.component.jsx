import React from 'react';

import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../../redux/user/user.selectors';

import RobotPoseImage from '../../../assets/robot/3.png';

import './info-box.styles.scss';

export default function InfoBox() {
  const {currentUser} = useSelector(createStructuredSelector({
    currentUser: selectCurrentUser,
  }))

  return (
    <div className="infoBox">
      <div className='infoBox__infobotContainer'>
        <img src={RobotPoseImage} alt='' />
      </div>
      <div className='infoBox__infoMessage'>
        <p className='infoBox__infoMessage-title'>Hejka {currentUser.name}!</p>
        <p className='infoBox__infoMessage-description'>
          Wiedziałem, że w końcu tutaj zajrzysz. W sklepiku znajdziesz wszystkie niezbędne przedmioty do ochrony swoich zębatek i nie tylko. Czego potrzebujesz?
        </p>
      </div>
    </div>
  );
}
