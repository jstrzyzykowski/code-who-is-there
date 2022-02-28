import React from 'react';

import { useDispatch } from 'react-redux';
import {closeModal} from '../../../redux/modal/modal.actions';

import ModalWrapper from '../../../modal/modal-wrapper.component';
import CustomButton from '../../common/custom-button/custom-button.component';
import CustomItemIcon from '../../common/custom-item-icon/custom-item-icon.component';

import './added-item-modal.styles.scss';

export default function AddedItemModal({payload}) {
  const {displayName, imageUrl, quantity} = payload;
  const dispatch = useDispatch();

  return (
    <ModalWrapper title='Zakupiono przedmiot'>
      <div className='addedItemModal__header'>
        <p className='addedItemModal__header-description'>
          Przedmiot <span>{displayName}</span> został dodany do Twojego <b>magazynu</b>. Pośpiesz się i spójrz na to cudo technologii!
        </p>
      </div>
      <div className='addedItemModal__body'>
        <CustomItemIcon quantity={quantity} displayName={displayName} imageUrl={imageUrl}/>
        <p className='addedItemModal__body-itemName'>{displayName}</p>
      </div>
      <div className='addedItemModal__actions'>
        <CustomButton onClick={() => dispatch(closeModal())}>Zamknij</CustomButton>
      </div>
    </ModalWrapper>
  );
}