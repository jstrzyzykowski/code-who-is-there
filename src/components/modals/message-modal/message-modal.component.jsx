import React from 'react';

import { useDispatch } from 'react-redux';
import { closeModal } from '../../../redux/modal/modal.actions';

import modalTypes from './message-modal.data';

import ModalWrapper from '../../../modal/modal-wrapper.component';
import CustomButton from '../../common/custom-button/custom-button.component';

import './message-modal.styles.scss';

export default function MessageModal({payload: {type, message}}) {
  // Types:
  // + info
  // + warning
  // + error
  // + success
  // const title = modalTypes[type].title;
  const imageUrl = modalTypes[type].imageUrl;
  const dispatch = useDispatch();

  return (
    <ModalWrapper title='Powiadomienie'>
      <div className='messageModal'>
        <div className='messageModal__content'>
          <div className='messageModal__content-imageContainer'>
            <img src={imageUrl} alt={`${type} message`} />
          </div>
          <p className='messageModal__content-message'>{message}</p>
        </div>
        <CustomButton onClick={() => dispatch(closeModal())}>OK</CustomButton>
      </div>
    </ModalWrapper>
  );
}