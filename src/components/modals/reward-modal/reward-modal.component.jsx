import React from 'react';

import { useDispatch } from 'react-redux';
import { closeModal } from '../../../redux/modal/modal.actions';

import ModalWrapper from '../../../modal/modal-wrapper.component';
import CustomButton from '../../common/custom-button/custom-button.component';
import RewardList from './reward-list/reward-list.component';

import './reward-modal.styles.scss';

export default function RewardModal({payload}) {
  //TODO: Check how many items contains rewardList
  // if more than 1, that's mean there is extra item
  // so you can add different ModalWrapper title or
  // description and so on (checked, rdy to implement).
  const {rewardList} = payload;
  const dispatch = useDispatch();

  return (
    <ModalWrapper title='Tajemnicze pudło'>
      <div className='rewardModal__header'>
        <p className='rewardModal__header-description'>
          Powoli otwierasz pudło i Twoim oczom ukazuje się... to. Zastanawiasz się czy to przypadek czy może ktoś dokładnie wie czego pragniesz.
        </p>
      </div>
      <div className='rewardModal__body'>
        <RewardList items={rewardList}/>
      </div>
      <div className='rewardModal__actions'>
        <CustomButton onClick={() => dispatch(closeModal())}>
          Zamknij
        </CustomButton>
      </div>
    </ModalWrapper>
  );
}