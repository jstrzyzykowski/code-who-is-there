import React from 'react';

import CustomButton from '../../../components/common/custom-button/custom-button.component';
import SectionHeader from '../../../components/section-header/section-header.component';

import './settings.styles.scss';

export default function SettingsPage({history, match}) {

  return (
    <div className='settingsPage'>
      <div className='settingsPage__sectionContainer'>
        <SectionHeader>
          Ustawienia konta
        </SectionHeader>
        <div className='settingsPage__sectionContainer-sectionBody'>
          <div className='settingsPage__sectionContainer-sectionBody-item'>
            <i className='fas fa-address-card'/>
            <div className='settingsPage__sectionContainer-sectionBody-item-text'>
              <p className='settingsPage__sectionContainer-sectionBody-item-text-title'>Profil</p>
              <p className='settingsPage__sectionContainer-sectionBody-item-text-description'>Zmień swój nickname i inne</p>
            </div>
            <CustomButton onClick={() => history.push(`${match.path}/profile`)} blue>
              Edytuj
            </CustomButton>
          </div>
          <div className='settingsPage__sectionContainer-sectionBody-item'>
            <i className='fas fa-key'/>
            <div className='settingsPage__sectionContainer-sectionBody-item-text'>
              <p className='settingsPage__sectionContainer-sectionBody-item-text-title'>Hasło</p>
              <p className='settingsPage__sectionContainer-sectionBody-item-text-description'>Zmień hasło do konta</p>
            </div>
            <CustomButton onClick={() => history.push(`${match.path}/password`)} blue>
              Edytuj
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}