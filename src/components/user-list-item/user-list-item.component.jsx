import React from 'react';
import {useHistory} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../redux/modal/modal.actions';

import Avatar from '../common/avatar/avatar.component';
import Statisticker from '../common/statisticker/statisticker.component';
import CustomButton from '../common/custom-button/custom-button.component';

import './user-list-item.styles.scss';

export default function UserListItem({id, emiter: {avatarUrl, gears}, comment, nickname, emiterSession: {isInPlace}, rank}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleAttack = () => {
    const enemyCooldown = currentUser.battlesCooldowns.find((cooldownObj) => cooldownObj.enemyId === id);

    if(enemyCooldown) {
      // NORMAL 30min
      // BETA 20min
      const isCooldownFinished = new Date().getTime() - enemyCooldown.lastAttackAt > 20 * 60 * 1000;
      if(isCooldownFinished) {
        dispatch(openModal({
          modalName: 'PlayerAttackModal',
          modalPayload: { id, nickname, gears, avatarUrl },
        }));
      } else {
        // NORMAL 30min
        // BETA 20min
        const nextPossibleAttackTime = new Date(enemyCooldown.lastAttackAt + (20 * 60 * 1000));
        dispatch(openModal({modalName: 'MessageModal', modalPayload: {type: 'info', message: `Następny możliwy atak o godzinie ${nextPossibleAttackTime.toLocaleTimeString()}. Pamiętaj, że możesz zaatakować każdego gracza raz na 20 minut.`}}))
      }
    } else {
      dispatch(openModal({
        modalName: 'PlayerAttackModal',
        modalPayload: { id, nickname, gears, avatarUrl },
      }));
    }
  };

  return (
    <div className={`userListItem ${!!rank ? 'rank' : ''} ${rank === 1 ? 'first' : ''} ${rank === 2 ? 'second' : ''} ${rank === 3 ? 'third' : ''}`}>
      {rank && (
        <div className='userListItem__rankContainer'>
          <p className='userListItem__rankContainer-value'>{rank}</p>
          <div className='userListItem__rankContainer-color'/>
        </div>
      )}
      <Avatar size={40} imageURL={avatarUrl} circle withActivityStatus activityStatus={isInPlace}/>
      <div className='userListItem__userInfo'>
        <p className='userListItem__userInfo-nickname' onClick={() => history.push(`/app/users/${id}`)}>{nickname}</p>
        <p className='userListItem__userInfo-comment'>{comment}</p>
      </div>
      <div className='userListItem__actions'>
        <Statisticker value={gears} iconClassName='fas fa-cog'/>
        {currentUser.id !== id && <CustomButton onClick={handleAttack}>Atakuj</CustomButton>}
      </div>
    </div>
  );
}