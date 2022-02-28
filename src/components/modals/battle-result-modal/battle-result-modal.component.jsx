import React from 'react';

import { closeModal } from '../../../redux/modal/modal.actions';
import { useDispatch } from 'react-redux';

import { getBattleResultMessage } from './battle-result-modal.data';

import CustomButton from '../../common/custom-button/custom-button.component';
import ModalWrapper from '../../../modal/modal-wrapper.component';
import RewardList from '../reward-modal/reward-list/reward-list.component';
import BattleParticipant from './battle-participant/battle-participant.component';

import './battle-result-modal.styles.scss';

export default function BattleResultModal({payload}) {
  const {rewardList, attacker, defender} = payload;
  const dispatch = useDispatch();

  return (
    <ModalWrapper title='Raport ataku'>
      <div className='battleResultModal__header'>
        <p className='battleResultModal__header-description'>
          {getBattleResultMessage(attacker)}
        </p>
      </div>
      <div className='battleResultModal__body'>
        <div className='battleResultModal__body-battleParticipants'>
          <BattleParticipant {...attacker}/>
          <BattleParticipant {...defender}/>
        </div>
        {rewardList.length > 0 && (
          <div className='battleResultModal__body-battleRewardContainer'>
            <p className='battleResultModal__body-battleRewardContainer-label'>Przejęte przedmioty</p>
            <RewardList items={rewardList}/>
          </div>
        )}
      </div>
      <div className='battleResultModal__actions'>
        <CustomButton onClick={() => dispatch(closeModal())}>Zamknij</CustomButton>
      </div>
    </ModalWrapper>
  );
}