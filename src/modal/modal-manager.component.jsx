import React from 'react';
import ReactDOM from 'react-dom';

import { useSelector } from 'react-redux';

import RewardModal from '../components/modals/reward-modal/reward-modal.component';
import TransactionModal from '../components/modals/transaction-modal/transaction-modal.component';
import AddedItemModal from '../components/modals/added-item-modal/added-item-modal.component';
import PlayerAttackModal from '../components/modals/player-attack-modal/player-attack-modal.component';
import BattleResultModal from '../components/modals/battle-result-modal/battle-result-modal.component';
import MessageModal from '../components/modals/message-modal/message-modal.component';

export default function ModalManager() {
  // Here we store all app modals
  // {
  //    modalName: <ModalComponent/>
  // }

  const modalStorage = {
    RewardModal,
    TransactionModal,
    AddedItemModal,
    PlayerAttackModal,
    BattleResultModal,
    MessageModal,
  };

  const currentModal = useSelector((state) => state.modal);
  let renderedModal;

  if(currentModal.modalName) {
    const {modalName, modalPayload} = currentModal;
    const ModalComponent = modalStorage[modalName];
    renderedModal = <ModalComponent payload={modalPayload}/>
  }

  return ReactDOM.createPortal(
    renderedModal,
    document.getElementById('modals')
  );
}