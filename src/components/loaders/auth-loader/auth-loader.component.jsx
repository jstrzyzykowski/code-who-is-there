import React from 'react';

import './auth-loader.styles.scss';

export default function AuthLoader() {
  return (
    <div className='authLoader'>
      <div className="authLoader__loader">
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
      </div>
      <div className='authLoader__text'>
        <p>Checking</p>
        <p>Authentication</p>
      </div>
    </div>
  );
}