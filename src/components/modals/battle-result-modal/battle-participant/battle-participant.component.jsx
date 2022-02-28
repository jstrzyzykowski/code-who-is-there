import React from 'react';

import './battle-participant.styles.scss';

export default function BattleParticipant({nickname, avatarUrl, gearsResultValue, status, role}) {
  return (
    <div className='battleParticipant'>
      <p className='battleParticipant__roleInBattle'>{role === 'Attacker' ? 'Atakujący' : 'Obrońca'}</p>
      <div className='battleParticipant__imageContainer'>
        <img src={avatarUrl} alt='' />
      </div>
      <div className='battleParticipant__participantInfo'>
        <p className='battleParticipant__participantInfo-nickname'>{nickname}</p>
        <p className='battleParticipant__participantInfo-gearsResult'>{gearsResultValue > 0 ? '+': ''}<span>{gearsResultValue}</span><i className='fas fa-cog'/></p>
      </div>
    </div>
  );
}