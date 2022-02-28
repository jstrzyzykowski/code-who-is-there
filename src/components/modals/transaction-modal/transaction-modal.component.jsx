import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '../../../redux/modal/modal.actions';

import EmiterDataService from '../../../services/emiter.service';
import InventoryDataService from '../../../services/inventory.service';

import ModalWrapper from '../../../modal/modal-wrapper.component';
import CustomButton from '../../common/custom-button/custom-button.component';

import './transaction-modal.styles.scss';

export default function TransactionModal({payload}) {
  const {displayName, price, imageUrl} = payload;
  const {currentUser} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleConfirmBuy = async () => {
    if(currentUser.emiter.gears >= price) {
      try {
        await EmiterDataService.payForShopItem(currentUser, price);
        await InventoryDataService.addItemToUserInventory(currentUser, payload);
        dispatch(openModal({modalName: 'AddedItemModal', modalPayload: payload}));
      } catch(error) {
        console.error(error.message);
      }
    } else {
      // You have not enough gears
      dispatch(closeModal());
    }
  }

  return (
    <ModalWrapper title='Zakup Przedmiotu'>
        <div className='transactionModal__header'>
          <div className='transactionModal__header-description'>
            <p className='transactionModal__header-description-message'>
              Czy na pewno chcesz kupić <span>{displayName}</span>?
            </p>
            <p className='transactionModal__header-description-warning'>
              Tej akcji nie można cofnąć!
            </p>
          </div>
        </div>
      <div className='transactionModal__body'>
        <div className='transactionModal__body-imageContainer'>
          <img src={imageUrl} alt='' />
        </div>
        <div className='transactionModal__body-balance'>
          <p>Aktualny stan konta <span><i className='fas fa-cog'/>{currentUser.emiter.gears}</span></p>
          <p>Cena zakupu <span><i className='fas fa-cog'/>{price}</span></p>
          <p>Stan konta po transakcji <span><i className='fas fa-cog'/>{currentUser.emiter.gears - price}</span></p>
        </div>
      </div>
      <div className='transactionModal__actions'>
        <CustomButton onClick={() => dispatch(closeModal())}>Zamknij</CustomButton>
        <CustomButton green onClick={handleConfirmBuy}>Kup</CustomButton>
      </div>
    </ModalWrapper>
  );
}